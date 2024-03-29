import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Layout from '../../hocs/layout'
import { useEffect } from 'react'
import { useState } from 'react'
import {
    get_items,
    get_total,
    get_item_total,
    update_item,
    remove_item,
} from '../../redux/actions/cart'
import { check_coupon } from '../../redux/actions/coupons'
import { get_shipping_options } from '../../redux/actions/shipping'
import { get_user_profile, update_user_profile } from '../../redux/actions/profile'
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert";
import ShippingForm from '../../components/checkout/ShippingForm';

import {
    get_payment_total,
    get_client_token,
    process_payment,
    reset
} from '../../redux/actions/payment';

import DropIn from 'braintree-web-drop-in-react';
import { Oval } from 'react-loader-spinner'
import { countries } from '../../helpers/fixedCountries'
import { makePayment, process_order_crypto } from '../../redux/actions/web3';


const Checkout = ({
    isAuthenticated,
    user,
    items,
    total_items,
    shipping,
    clientToken,
    made_payment,
    loading,
    original_price,
    total_amount,
    total_compare_amount,
    estimated_tax,
    shipping_cost,
    update_item,
    remove_item,
    setAlert,
    get_shipping_options,
    get_payment_total,
    get_client_token,
    process_payment,
    get_items,
    get_total,
    get_item_total,
    check_coupon,
    coupon,
    total_after_coupon,
    update_user_profile,
    get_user_profile,
    profile,
    eth_price,
    process_order_crypto,
    makePayment,
    hash,
    made_payment_crypto,
    account,
    network,
    reset
}) => {

    const [payWithEth, setPayWithEth] = useState(false)

    const [formData, setFormData] = useState({
        full_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state_province_region: '',
        postal_zip_code: '',
        country_region: 'Peru',
        telephone_number: '',
        coupon_name: '',
        shipping_id: 0,
    });

    const [data, setData] = useState({
        instance: {}
    });

    const {
        full_name,
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        postal_zip_code,
        country_region,
        telephone_number,
        coupon_name,
        shipping_id,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const buy = async e => {
        e.preventDefault();
        if (payWithEth) {
            if (coupon && coupon !== null && coupon !== undefined) {
                const ethAmount = (total_amount / eth_price).toFixed(4)
                await makePayment(ethAmount)
                const newHash = localStorage.getItem("hash");
                process_order_crypto(
                    total_amount,
                    shipping_id,
                    coupon.name,
                    full_name,
                    address_line_1,
                    address_line_2,
                    city,
                    state_province_region,
                    postal_zip_code,
                    country_region,
                    telephone_number,
                    newHash,
                    ethAmount
                );


            } else {
                const ethAmount = (total_amount / eth_price).toFixed(4)
                await makePayment(ethAmount)
                let newHash = localStorage.getItem("hash");
                process_order_crypto(
                    total_amount,
                    shipping_id,
                    '',
                    full_name,
                    address_line_1,
                    address_line_2,
                    city,
                    state_province_region,
                    postal_zip_code,
                    country_region,
                    telephone_number,
                    newHash,
                    ethAmount
                );

            }
        }
        else {
            let nonce = await data.instance.requestPaymentMethod();
            if (coupon && coupon !== null && coupon !== undefined) {

                process_payment(
                    nonce,
                    shipping_id,
                    coupon.name,
                    full_name,
                    address_line_1,
                    address_line_2,
                    city,
                    state_province_region,
                    postal_zip_code,
                    country_region,
                    telephone_number
                );

            } else {
                process_payment(
                    nonce,
                    shipping_id,
                    '',
                    full_name,
                    address_line_1,
                    address_line_2,
                    city,
                    state_province_region,
                    postal_zip_code,
                    country_region,
                    telephone_number,
                );


            }
            update_user_profile(
                address_line_1,
                address_line_2,
                city,
                state_province_region,
                postal_zip_code,
                telephone_number,
                country_region
            )
        }
    }


    const apply_coupon = async e => {
        e.preventDefault();

        check_coupon(coupon_name);
    };

    const [render, setRender] = useState(false)

    const token = async () => {
        await reset()
        await get_client_token();
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        get_shipping_options();
        if (isAuthenticated !== null && isAuthenticated !== undefined && isAuthenticated) {
            token();
            get_user_profile();

        }
    }, [])
    useEffect(()=>{
        token()
    },[isAuthenticated])

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
    }, [])

    useEffect(() => {
        if (shipping_id && shipping_id !== null && shipping_id !== undefined && coupon)
            get_payment_total(shipping_id, coupon.name);
        else
            get_payment_total(shipping_id, '');
    }, [shipping_id, items, coupon]);

    if (isAuthenticated !== null && isAuthenticated !== undefined && !isAuthenticated)
        return <Navigate to='/' />

    const showItems = () => {
        return (
            <div>
                {
                    items &&
                    items !== null &&
                    items !== undefined &&
                    items.length !== 0 &&
                    items.map((item, index) => {
                        let count = item.count;
                        return (
                            <div key={index}>
                                <CartItem
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_item={remove_item}
                                    render={render}
                                    setRender={setRender}
                                    setAlert={setAlert}
                                />
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const renderShipping = () => {
        if (shipping && shipping !== null && shipping !== undefined) {
            return (
                <div className='mb-5'>
                    {
                        shipping.map((shipping_option, index) => (
                            <div key={index}>
                                <input
                                    onChange={e => onChange(e)}
                                    value={shipping_option.id}
                                    name='shipping_id'
                                    type='radio'
                                    required
                                />
                                <label className='ml-4'>
                                    {shipping_option.name} - ${shipping_option.price} ({shipping_option.time_to_delivery})
                                </label>
                            </div>
                        ))
                    }
                </div>
            );
        }
    };

    const renderPaymentInfo = () => {
        if (clientToken !== null && clientToken !== undefined) {
            return (
                <>
                    <DropIn
                        options={{
                            authorization: clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />

                    <div className="mt-6">
                        {loading ? <button
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            <Oval
                                type="Oval"
                                color="#fff"
                                width={20}
                                height={20}
                            />
                        </button> :
                            <>
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                                >
                                    Place Order
                                </button>
                                <div className='text-center'>
                                    Or
                                </div>
                                {account !== null ?
                                    <>
                                        {network !== 1 && network.toString() !== process.env.REACT_APP_ETH_NETWORK.toString()  ?
                                            <>
                                                Pay with Crypto
                                                <button
                                                    onClick={async () => {
                                                        await window.ethereum.request(
                                                            {
                                                                method: "wallet_switchEthereumChain",
                                                                params: [
                                                                    {
                                                                        chainId:
                                                                            "0x1",
                                                                    },
                                                                ], // chainId must be in hexadecimal numbers
                                                            }
                                                        );
                                                    }}
                                                    className="w-full bg-red-200 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-red-800 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                                                >

                                                    Change Network to Mainnet
                                                </button>
                                            </>
                                            :
                                            <button
                                                onClick={() => setPayWithEth(true)}
                                                type="submit"
                                                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                                            >
                                                Pay With Crypto
                                            </button>


                                        }
                                    </>
                                    :
                                    <>
                                        Pay with Crypto
                                        <Link to='/connect'>
                                            <button
                                                className="w-full bg-red-200 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-red-800 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                                            >
                                                Connect Metamask
                                            </button>
                                        </Link>
                                    </>
                                }


                            </>

                        }
                    </div>
                </>
            )

        } else {
            if (!isAuthenticated) {
                <Link
                    to="/login"
                    className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                >
                    Login
                </Link>
            } else {
                <button
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                    <Oval
                        type="Oval"
                        color="#fff"
                        width={20}
                        height={20}
                    />
                </button>
            }
        }

    }

    if (made_payment)
        return <Navigate to='/thankyou' />;

    if (made_payment_crypto && hash !== null)
        return <Navigate to='/thankyou' />;

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {showItems()}
                            </ul>
                        </section>

                        {/* Order summary */}
                        {user && isAuthenticated !== null && isAuthenticated &&
                            <ShippingForm
                                original_price={original_price}
                                full_name={full_name}
                                address_line_1={address_line_1}
                                address_line_2={address_line_2}
                                city={city}
                                state_province_region={state_province_region}
                                postal_zip_code={postal_zip_code}
                                telephone_number={telephone_number}
                                countries={countries}
                                onChange={onChange}
                                buy={buy}
                                user={user}
                                renderShipping={renderShipping}
                                total_amount={total_amount}
                                total_after_coupon={total_after_coupon}
                                total_compare_amount={total_compare_amount}
                                estimated_tax={estimated_tax}
                                shipping_cost={shipping_cost}
                                shipping_id={shipping_id}
                                shipping={shipping}
                                renderPaymentInfo={renderPaymentInfo}
                                coupon={coupon}
                                apply_coupon={apply_coupon}
                                coupon_name={coupon_name}
                                profile={profile}
                                eth_price={eth_price}
                            />
                        }




                    </div>

                    {/* {showWishlistItems()} */}

                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    items: state.Cart.items,
    total_items: state.Cart.total_items,
    shipping: state.Shipping.shipping,
    clientToken: state.Payment.clientToken,
    made_payment: state.Payment.made_payment,
    loading: state.Payment.loading,
    original_price: state.Payment.original_price,
    total_after_coupon: state.Payment.total_after_coupon,
    total_amount: state.Payment.total_amount,
    total_compare_amount: state.Payment.total_compare_amount,
    estimated_tax: state.Payment.estimated_tax,
    shipping_cost: state.Payment.shipping_cost,
    coupon: state.Coupons.coupon,
    profile: state.Profile.profile,
    eth_price: state.web3.eth_price,
    hash: state.web3.hash,
    made_payment_crypto: state.web3.made_payment,
    account: state.web3.account,
    network: state.web3.network
})

export default connect(mapStateToProps, {

    update_item,
    remove_item,
    setAlert,
    get_shipping_options,
    get_payment_total,
    get_client_token,
    process_payment,
    get_items,
    get_total,
    get_item_total,
    check_coupon,
    update_user_profile,
    get_user_profile,
    process_order_crypto,
    makePayment,
    reset
})(Checkout);