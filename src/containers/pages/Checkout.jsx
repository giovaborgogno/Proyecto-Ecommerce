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
import {get_shipping_options} from '../../redux/actions/shipping'
import CartItem from "../../components/cart/CartItem";
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert";
import ShippingForm from '../../components/checkout/ShippingForm';

const Checkout = ({
    isAuthenticated,
    get_items,
    get_total,
    get_item_total,
    update_item,
    remove_item,
    items,
    amount,
    compare_amount,
    get_shipping_options,
    shipping,
    setAlert,
}) => {

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


    const [render, setRender] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        get_shipping_options();
    }, [])

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
                        <ShippingForm
                            full_name={full_name}
                            address_line_1={address_line_1}
                            address_line_2={address_line_2}
                            city={city}
                            state_province_region={state_province_region}
                            postal_zip_code={postal_zip_code}
                            telephone_number={telephone_number}
                            // countries={countries}
                            onChange={onChange}
                            // buy={buy}
                            // user={user}
                            renderShipping={renderShipping}
                            // total_amount={total_amount}
                            // total_after_coupon={total_after_coupon}
                            // total_compare_amount={total_compare_amount}
                            // estimated_tax={estimated_tax}
                            // shipping_cost={shipping_cost}
                            shipping_id={shipping_id}
                            shipping={shipping}
                            // renderPaymentInfo={renderPaymentInfo}
                            // coupon={coupon}
                            // apply_coupon={apply_coupon}
                            coupon_name={coupon_name}
                        />
                    </div>

                    {/* {showWishlistItems()} */}

                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    shipping: state.Shipping.shipping,
})
export default connect(mapStateToProps, {
    get_items,
    get_total,
    get_item_total,
    update_item,
    remove_item,
    setAlert,
    get_shipping_options,
})(Checkout);