import Layout from "../../hocs/layout";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { get_product, get_related_products } from "../../redux/actions/products";
import { useEffect } from "react";
import { useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import ImageGallery from "../../components/product/ImageGallery";
import { Oval } from 'react-loader-spinner'
import {
    get_items,
    add_item,
    get_total,
    get_item_total,
    remove_item
} from '../../redux/actions/cart'
import { Link } from "react-router-dom";
import { 
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total ,
    remove_wishlist_item
  } from '../../redux/actions/wishlist';

const ProductDetail = ({
    get_product,
    get_related_products,
    product,
    related_products,
    get_items,
    add_item,
    get_total,
    get_item_total,
    items,
    remove_item,
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total ,
    remove_wishlist_item,
    isAuthenticated,
    wishlist
}) => {
    // const [selectedColor, setSelectedColor] = useState(product.colors[0])

    const [loading, setLoading] = useState(false)

    const [product_added, setProduct_added] = useState(false)

    const [isFavorite, setIsFavorite] = useState(false)

    const navigate = useNavigate()

    const params = useParams()
    const productId = params.productId;

    const addToCart = async () => {
        if (product && product !== null && product !== undefined && product.quantity > 0) {
            setLoading(true);
            await add_item(product);
            await get_items();
            await get_total();
            await get_item_total();
            setLoading(false);
            setProduct_added(true);
            // navigate('/cart');
        }
    }


    const removeToCart = async () => {
        if (product && product !== null && product !== undefined && product.quantity > 0) {
            setLoading(true);
            let cart_item = [];

            if (
                items &&
                items !== null &&
                items !== undefined &&
                items.length !== 0) {


                items.map((item, index) => {
                    if (item.product.id.toString() === product.id.toString()) {
                        cart_item = item;
                    }
                });

            }
            await remove_item(cart_item);
            await get_items();
            await get_total();
            await get_item_total();
            setLoading(false);
            setProduct_added(false)
            // navigate('/cart');

        }
    }

    const isAdded = async () => {
        if (product && product !== null && product !== undefined && product.quantity > 0) {
            if (
                items &&
                items !== null &&
                items !== undefined &&
                items.length !== 0) {


                items.map((item, index) => {
                    if (item.product.id.toString() === productId.toString()) {
                        setProduct_added(true)
                    }
                });

            }
        }
    }

    const synchCart = async () => {
        await get_items();
        await get_total();
        await get_item_total();
        await isAdded();
    }

    const is_Favorite = async () => {
        if(
            wishlist &&
            wishlist !== null &&
            wishlist !== undefined &&
            product &&
            product !== null &&
            product !== undefined
            ){
              wishlist.map(item => {
                  if (item.product.id.toString() === productId.toString()) {
                      setIsFavorite(true);
                  }
              });
          }
    }

    const addToWishlist = async () => {
        if (isAuthenticated) {
          let isPresent = false;

          if(
            wishlist &&
            wishlist !== null &&
            wishlist !== undefined &&
            product &&
            product !== null &&
            product !== undefined
            ){
              wishlist.map(item => {
                  if (item.product.id.toString() === productId.toString()) {
                      isPresent = true;
                  }
              });
          }
          
          if (isPresent) {
            await remove_wishlist_item(productId);
            // await remove_wishlist_item(product.id);
            await get_wishlist_items();
            await get_wishlist_item_total();
            setIsFavorite(false);
          } else {
            await remove_wishlist_item(productId);
            // await remove_wishlist_item(product.id);
              await add_wishlist_item(productId);
            //   await add_wishlist_item(product.id);
              await get_wishlist_items();
              await get_wishlist_item_total();
              await get_items();
              await get_total();
              await get_item_total();
              setIsFavorite(true);
          }
            
        } else {
          return <Navigate to="/login"/>
        }
      };

    const synchWishlist = async () => {
        await get_wishlist_items() 
        await get_wishlist_item_total()
        await is_Favorite();
    }





    useEffect(() => {
        window.scrollTo(0, 0);
        get_product(productId)
        get_related_products(productId)
        synchCart();
        synchWishlist();
    }, [])

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        <ImageGallery data={product} />
                        {/* Product info */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-gray-900">{product && product.price}</p>
                            </div>



                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    className="text-base text-gray-700 space-y-6"
                                    dangerouslySetInnerHTML={{ __html: product && product.description }}
                                />
                            </div>

                            <div className="mt-6">

                                <div>
                                    <h3 className="text-sm text-gray-600">Color</h3>

                                    <fieldset className="mt-2">
                                        <legend className="sr-only">
                                            Choose a color
                                        </legend>
                                        <div className="flex items-center space-x-3">

                                            <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-700">
                                                <input type="radio" name="color-choice" value="Washed Black" className="sr-only" aria-labelledby="color-choice-0-label" />
                                                <p id="color-choice-0-label" className="sr-only">
                                                    Washed Black
                                                </p>
                                                <span aria-hidden="true" className="h-8 w-8 bg-gray-700 border border-black border-opacity-10 rounded-full"></span>
                                            </label>

                                            <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                                                <input type="radio" name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-1-label" />
                                                <p id="color-choice-1-label" className="sr-only">
                                                    White
                                                </p>
                                                <span aria-hidden="true" className="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full"></span>
                                            </label>


                                            <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-500">
                                                <input type="radio" name="color-choice" value="Washed Gray" className="sr-only" aria-labelledby="color-choice-2-label" />
                                                <p id="color-choice-2-label" className="sr-only">
                                                    Washed Gray
                                                </p>
                                                <span aria-hidden="true" className="h-8 w-8 bg-gray-500 border border-black border-opacity-10 rounded-full"></span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>

                                <p className="mt-4">
                                    {
                                        product &&
                                            product !== null &&
                                            product !== undefined &&
                                            product.quantity > 0 ? (
                                            <span className='text-green-500'>
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className='text-red-500'>
                                                Out of Stock
                                            </span>
                                        )
                                    }
                                </p>


                                
                                <div className="mt-4 flex sm:flex-col1">
                                    {loading ?
                                        <button
                                            className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                        >
                                            <Oval
                                                type="Oval"
                                                color="#fff"
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                        :
                                        product_added ?
                                            <button
                                                onClick={removeToCart}
                                                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                            >
                                                Remove to cart
                                            </button>
                                            :
                                            <button
                                                onClick={addToCart}
                                                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                            >
                                                Add to cart
                                            </button>
                                    }

                                    {isFavorite? 
                                    <button
                                    onClick={addToWishlist}
                                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-red-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Add to favorites</span>
                                </button>
                                :
                                <button
                                        onClick={addToWishlist}
                                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-100 hover:text-red-500"
                                    >
                                        <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Add to favorites</span>
                                    </button>
                                    }

                                
                                </div>
                                <Link to="/cart">
                                    <button
                                        className=" pt-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                    >
                                        View Cart
                                    </button>
                                </Link>
                                
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,
    related_products: state.Products.related_products,
    items: state.Cart.items,
    isAuthenticated: state.Auth.isAuthenticated,
    wishlist: state.Wishlist.items

})

export default connect(mapStateToProps, {
    get_product,
    get_related_products,
    get_items,
    add_item,
    get_total,
    get_item_total,
    remove_item,
    add_wishlist_item, 
    get_wishlist_items, 
    get_wishlist_item_total ,
    remove_wishlist_item
})(ProductDetail)