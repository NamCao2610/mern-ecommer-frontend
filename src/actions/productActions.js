
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../constants/productConstants';
import Axios from 'axios';

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try {
        const { data } = await Axios.get('/api/products');
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.message
        })
    }
}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    })
    try {
        const response = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}