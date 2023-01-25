// import React from 'react'
// import ReactDOM from 'react-dom'
import Layout from "../hocs/layout";
import {connect} from 'react-redux';
import { useEffect } from "react";
import {
    get_products_by_arrival,
    get_products_by_sold,
} from '../redux/actions/products'
import Banner from '../components/home/Banner'
import ProductsArrival from '../components/home/ProductsArrival'
import ProductsSold from "../components/home/ProductsSold";
import { useCallback } from "react";


const Home = ({
    get_products_by_arrival,
    get_products_by_sold,
    products_arrival,
    products_sold,
    eth_price
}) => {

    

    useEffect(()=>{
        window.scrollTo(0,0);

        get_products_by_arrival();
        get_products_by_sold();
    },[])

    return(
        <Layout>
            <div>
                
                <Banner/>
                <ProductsArrival data={products_arrival} eth_price={eth_price}/>
                <ProductsSold data={products_sold} eth_price={eth_price}/>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    products_arrival: state.Products.products_arrival,
    products_sold: state.Products.products_sold,
    eth_price: state.web3.eth_price
})

export default connect(mapStateToProps,{
    get_products_by_arrival,
    get_products_by_sold,
    
})(Home)