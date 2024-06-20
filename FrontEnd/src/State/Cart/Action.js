import { api } from "../../config/apiConfig"
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType.js"


export const getCart = () => async (dispatch) => {

    dispatch({ type: GET_CART_REQUEST })
    try {
        const { data } = await api.get(`/api/cart/`)
        dispatch({ type: GET_CART_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message })
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST })
    try {
        const { data } = await api.put('/api/cart/add', reqData)
        console.log('This is aaa', data);
        dispatch(getCart())
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message })
    }
}


export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST })
    try {
        const { data } = await api.delete(`/api/cart_items/${cartItemId}`)

        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: {cartItemId , data} })

    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message })
    }
}

export const updateCartItem = (reqData) => async (dispatch) => {


    dispatch({ type: UPDATE_CART_ITEM_REQUEST })

    try {

        const { data } = await api.put(`/api/cart_items/${reqData.cartItemId}`, reqData.data)

        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data })
        dispatch(getCart())
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message })
    }
}