import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import {
    get_items,
    get_total,
    get_item_total,
} from '../redux/actions/cart'

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
        auth();
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
})(Layout)