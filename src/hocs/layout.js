import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_user_profile } from '../redux/actions/profile';
import {
    get_items,
    get_total,
    get_item_total,
} from '../redux/actions/cart'
// import { get_my_user_details } from "../redux/actions/user";
import { get_network_id, loadWeb3 } from "../redux/actions/web3";

import { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/navigation/navbar';
import Footer from '../components/navigation/footer';

const Layout = (props) => {

    const auth = async () => {
        await props.check_authenticated()
        await props.load_user()
    }

    useEffect(() => {
        props.get_total()
        props.get_item_total()
        props.get_items()
        props.get_user_profile()
        auth();
    }, []);

    if (window.ethereum) {
        window.ethereum.on("chainChanged", handleChainChanged);
        function handleChainChanged(_chainId) {
            // We recommend reloading the page, unless you must do otherwise
            window.location.reload();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("account")) {
                loadWeb3();
                // my_user ? <></>:get_my_user_details()
            }

        };
        fetchData();

        if (window.ethereum) {
            get_network_id();
        }
    }, []);

    return (
        <div>
            <Navbar />
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer />
        </div>
    )
}


export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
    get_items,
    get_total,
    get_item_total,
    get_user_profile,
    // get_my_user_details,
    get_network_id,
    loadWeb3,
})(Layout)