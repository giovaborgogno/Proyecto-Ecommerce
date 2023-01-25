import {
    LOAD_ETHEREUM_BALANCE_SUCCESS,
    LOAD_ETHEREUM_BALANCE_FAIL,
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_NETWORK_SUCCESS,
    LOAD_NETWORK_FAIL,
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
} from '../actions/types'

const initialState = {
    account: null,
    network: null,
    ethereum_balance: null,
    loading: null,
    made_payment: false,
    eth_price: null,
    hash: null
};

export default function web3(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_NETWORK_SUCCESS:
            return {
                ...state,
                network: payload,
            };
        case LOAD_WEB3_SUCCESS:
            return {
                ...state,
                account: payload,
            };
        case LOAD_WEB3_FAIL:
            return {
                ...state,
                web3: null,
            };
        case LOAD_NETWORK_FAIL:
            return {
                ...state,
                network: null,
            };
        case LOAD_ETHEREUM_BALANCE_SUCCESS:
            return {
                ...state,
                ethereum_balance: payload,
            };
        case LOAD_ETHEREUM_BALANCE_FAIL:
            return {
                ...state,
                ethereum_balance: null,
            };
        // case SET_LOADING:
        //     return {
        //         ...state,
        //         loading: payload,
        //     };
        case ETH_PAYMENT_SUCCESS:
            return{
                ...state,
                made_payment: true,
                hash: payload,
            }
        case ETH_PAYMENT_FAIL:
            return{
                ...state,
                made_payment: false,
                hash: null
            }
        case SET_ETH_PRICE_SUCCESS:
            return{
                ...state,
            eth_price: payload
        }
        case SET_ETH_PRICE_FAIL:
            return{
                ...state,
            eth_price: null
        }
        case CREATE_ORDER_FAIL:
        case CREATE_ORDER_SUCCESS:
            return{
                ...state,
            }
        case RESET_PAYMENT_INFO:
            return{
                ...state,
                hash: null,
                made_payment: false
            }
       
        default:
            return state;
    }
}