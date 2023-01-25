import Layout from '../../hocs/layout'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import {
    get_items,
    get_total,
    get_item_total,
    update_item,
    remove_item,
    add_item
} from '../../redux/actions/cart'
import { useState } from 'react'
import CartItem from "../../components/cart/CartItem";
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";
import { setAlert } from "../../redux/actions/alert";
import{get_wishlist_items, 
    get_wishlist_item_total ,
    remove_wishlist_item}from '../../redux/actions/wishlist'
import WishListItems from '../../components/cart/WishListItems'

const Cart = ({
    isAuthenticated,
    get_items,
    get_total,
    get_item_total,
    update_item,
    remove_item,
    items,
    amount,
    compare_amount,
    total_items,
    setAlert,
    wishlist_items,
    get_wishlist_items, 
    get_wishlist_item_total ,
    remove_wishlist_item,
    add_item,
    eth_price
}) => {

    const [render, setRender] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        get_items();
        get_total();
        get_item_total();
        get_wishlist_items();
        get_wishlist_item_total();
    }, [render])


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
                                    get_items={get_items}
                                    get_total={get_total}
                                    get_item_total={get_item_total}
                                />
                                
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const showWishlistItems = () => {
        return (
            <div>
                {
                    wishlist_items &&
                    wishlist_items !== null &&
                    wishlist_items !== undefined &&
                    wishlist_items.length !== 0 &&
                    <>
                        
                            <div >
                                <WishListItems
                                    data={wishlist_items}
                                    add_item={add_item}
                                    items={items}
                                    render={render}
                                    setRender={setRender}
                                    
                                />
                            </div>
                        
                        </>
                }
            </div>
        )
    }

/*  
    const showWishlistItems = () => {
        return(
            <div>
                {
                    wishlist_items && 
                    wishlist_items !== null && 
                    wishlist_items !== undefined && 
                    wishlist_items.length !== 0 && 
                    wishlist_items.map((item, index)=>{
                        let count = item.count;
                        return (
                            <div key={index}>
                                <WishlistItem 
                                    item={item}
                                    count={count}
                                    update_item={update_item}
                                    remove_wishlist_item={remove_wishlist_item}
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
*/
    const checkoutButton = () => {
        
        
        if (total_items < 1) {
            return (
                <>
                    <Link
                        to='/shop'

                    >
                        <button
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Buscar items
                        </button>
                    </Link>
                </>
            )
        } else if (!isAuthenticated) {
            return (<>
                <Link
                    to='/login'

                >
                    <button
                        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </Link>
            </>)

        } else {
            return (
                <>
                    <Link
                        to='/checkout'>
                        <button
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Checkout
                        </button>
                    </Link>
                </>
            )

        }
    
    }

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart Items ({total_items})</h1>
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
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                        >
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                Order summary
                            </h2>

                            <dl className="mt-6 space-y-4">

                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">${compare_amount.toFixed(2)}</dd>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <dt className="flex items-center text-sm text-gray-600">
                                        <span>Discount</span>
                                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how shipping is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">${(compare_amount-amount).toFixed(2)}</dd>
                                </div>

                                {/* <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <dt className="flex text-sm text-gray-600">
                                        <span>Tax estimate</span>
                                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how tax is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                                </div> */}

                                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                                    {eth_price!==null?
                                    <dd className="text-base font-medium text-gray-900">${amount.toFixed(2)} or {(amount / eth_price).toFixed(4)} ETH</dd>
                                    :
                                    <dd className="text-base font-medium text-gray-900">${amount.toFixed(2)}</dd>
                                    }
                                </div>
                            </dl>

                            <div className="mt-6">
                                {checkoutButton()}
                            </div>
                        </section>
                    </div>
                    
                    {showWishlistItems()}

                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    wishlist_items: state.Wishlist.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    total_items: state.Cart.total_items,
    eth_price: state.web3.eth_price

})

export default connect(mapStateToProps, {
    get_items,
    get_total,
    get_item_total,
    update_item,
    remove_item,
    setAlert,
    get_wishlist_items, 
    get_wishlist_item_total ,
    remove_wishlist_item,
    add_item
})(Cart)