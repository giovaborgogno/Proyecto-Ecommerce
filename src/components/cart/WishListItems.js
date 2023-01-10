import { useState } from "react"
import { Link } from "react-router-dom"

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
  
  export default function WishListItems({
    data, 
    add_item, 
    items, 
    render, 
    setRender,
    get_items,
    get_total,
    get_item_total}) {

    const addItem = async(wishlist_item)=>{
      
      await add_item(wishlist_item.product);
      setRender(!render)
      
    }

    const showButton = (wishlist_item) =>{
      let isAdded = false
      items.map((item)=>{
        if(item.product.id.toString() === wishlist_item.product.id.toString()){
          isAdded = true
        }
        
      })
      
      if(!isAdded){
        return(
          <button 
          onClick={ () => {
            // add_item(wishlist_item.product); 
            addItem(wishlist_item)
            
            
          }}
          className=" bg-indigo-600 border border-transparent rounded-md shadow-sm py-1 px-3 mt-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          
          >Add to Cart</button>
          )
          
        }
        else{
        return(
          <button 
              
              className=" bg-green-600 border border-transparent rounded-md shadow-sm py-1 px-3 mt-1 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                        
              >Added</button>
        )
      }
    }
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Your Wish List</h2>
            
          </div>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
            {data && data.map((item) => (
              <>
              <div key={item.product.id} className="group relative">
                <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.get_thumbnail}
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                  </Link>
                </div>
                <div>
                  
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  <Link to={`/product/${item.product.id}`}>
                    {/* <span className="absolute inset-0" /> */}
                    {item.product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">${item.product.price}</p>

                {showButton(item)}
                
              
              </div>
              </>
            ))}
          </div>
              
          
        </div>
      </div>
    )
  }
  