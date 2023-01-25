import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

export default function ProductCard({product, eth_price}){

  function usdToEther(product_price, eth_price) {

    // Convertir el valor en USD a Ethereum
    const etherAmount = product_price / Number(eth_price);

    return etherAmount.toFixed(4)

}

    return(
            <div key={product.id} className="group relative mx-2">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={`${process.env.REACT_APP_API_URL}${product.photo}`}
                  alt=""
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                {eth_price!==null?
                <p className="text-sm font-medium text-gray-900">${product.price} or {usdToEther(product.price, eth_price).toString()} ETH</p>
                :
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                }
                {/* <p className="text-sm font-medium text-gray-900">${product.price} or {(product.price / Number(eth_price)).toFixed(4).toString()} ETH</p> */}
                
              </div>
            </div>
    )


}

