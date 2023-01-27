import {
    LOAD_ETHEREUM_BALANCE_SUCCESS,
    LOAD_ETHEREUM_BALANCE_FAIL,
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_NETWORK_SUCCESS,
    LOAD_NETWORK_FAIL,
    LOAD_GAS_SUCCESS,
    LOAD_GAS_FAIL,
    // SET_LOADING,
    ETH_PAYMENT_SUCCESS,
    ETH_PAYMENT_FAIL,
    SET_ETH_PRICE_SUCCESS,
    SET_ETH_PRICE_FAIL,
    SET_PAYMENT_LOADING,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    REMOVE_PAYMENT_LOADING,
    RESET_PAYMENT_INFO,
} from "./types";
import { setAlert } from "./alert";
import { get_item_total } from "./cart";

import { ethers } from "ethers";
// import { create_user, get_my_user_details } from "./user";
import axios from "axios";

export const loadWeb3 = () => async dispatch => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        localStorage.setItem("account", accounts[0]);
        dispatch({
            type: LOAD_WEB3_SUCCESS,
            payload: accounts[0],
        });

        // Cargar Ethereum bALANCE
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = ethers.utils.formatEther(balance);

        dispatch({
            type: LOAD_ETHEREUM_BALANCE_SUCCESS,
            payload: balanceInEth,
        });

    } else {
        dispatch({
            type: LOAD_WEB3_FAIL,
        });
        dispatch({
            type: LOAD_ETHEREUM_BALANCE_FAIL,
        });
    }
}


export const loginWeb3 = () => async dispatch => {
    // dispatch({
    //     type: SET_LOADING,
    //     payload: true,
    // });

    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        // Cargar Ethereum bALANCE
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = ethers.utils.formatEther(balance);
        dispatch({
            type: LOAD_ETHEREUM_BALANCE_SUCCESS,
            payload: balanceInEth,
        });

        // CREAR USUARIO DE DJANGO
        // await dispatch(create_user())
        // await dispatch(get_my_user_details())

        // await dispatch({
        //     type: SET_LOADING,
        //     payload: false,
        // });

        localStorage.setItem("account", accounts[0]);
        dispatch({
            type: LOAD_WEB3_SUCCESS,
            payload: accounts[0],
        });
    } else {
        dispatch({
            type: LOAD_WEB3_FAIL,
        });
        // await dispatch({
        //     type: SET_LOADING,
        //     payload: false,
        // });
        dispatch({
            type: LOAD_ETHEREUM_BALANCE_FAIL,
        });
    }
}


export const get_network_id = () => async (dispatch) => {
    if (window.ethereum) {
        const netId = await window.ethereum.request({ method: "eth_chainId" });
        const networkID = parseInt(netId);

        dispatch({
            type: LOAD_NETWORK_SUCCESS,
            payload: networkID,
        });
    } else {
        dispatch({
            type: LOAD_NETWORK_FAIL,
            payload: false,
        });
    }
};

export const makePayment = (amount) => async (dispatch) => {
    if (window.ethereum) {
        const mywallet = process.env.REACT_APP_MYWALLET;
        const ethers = require('ethers')

        // Obtener la billetera conectada a MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Obtener el saldo de la billetera 
        let balance = await signer.getBalance();

        // Crear una transacción 
        const tx = {
            to: mywallet,
            value: ethers.utils.parseEther(amount.toString()),
            gasLimit: 21000,
            gasPrice: ethers.BigNumber.from("20000000000")
        };

        try {
            // Enviar la transacción 
            let transaction = await signer.sendTransaction(tx);
            console.log(`Transacción enviada: ${transaction.hash}`);

            if (transaction.hash !== null) {
                localStorage.setItem("hash", transaction.hash.toString());
                dispatch({
                    type: ETH_PAYMENT_SUCCESS,
                    payload: transaction.hash,
                });
            }

            else {
                dispatch({
                    type: ETH_PAYMENT_FAIL,
                });
            }

        } catch (error) {
            dispatch({
                type: ETH_PAYMENT_FAIL,
            });
        }

    }
    else {
        dispatch({
            type: ETH_PAYMENT_FAIL,
        });
    }



}

export const etherPrice = () => async (dispatch) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'ethereum',
                vs_currencies: 'usd'
            }
        });
        const ethPrice = response.data.ethereum.usd;

        dispatch({
            type: SET_ETH_PRICE_SUCCESS,
            payload: ethPrice.toString()
        })
    } catch (error) {
        dispatch({
            type: SET_ETH_PRICE_FAIL,
        })
    }

}

export const process_order_crypto = (
    total_amount,
    shipping_id,
    coupon_name,
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_zip_code,
    country_region,
    telephone_number,
    transaction_id
) => async dispatch => {


    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        total_amount,
        shipping_id,
        coupon_name,
        full_name,
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        postal_zip_code,
        country_region,
        telephone_number,
        transaction_id
    });

    dispatch({
        type: SET_PAYMENT_LOADING
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/create-order`, body, config);
        if (res.status === 200) {
            dispatch({
                type: CREATE_ORDER_SUCCESS
            });
            dispatch(setAlert('Created order', 'green'));
            dispatch(get_item_total());
        } else {
            dispatch({
                type: CREATE_ORDER_FAIL
            });
            dispatch(setAlert('Error creating order', 'red'));
        }
    } catch (err) {
        dispatch({
            type: CREATE_ORDER_FAIL
        });
        dispatch(setAlert('Error processing payment', 'red'));
    }

    dispatch({
        type: REMOVE_PAYMENT_LOADING
    });
    window.scrollTo(0, 0);
}

export const reset_info = () => dispatch => {
    dispatch({
        type: RESET_PAYMENT_INFO
    });
};