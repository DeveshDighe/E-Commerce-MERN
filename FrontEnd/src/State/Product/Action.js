import { api } from "../../config/apiConfig";
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST })
    const { color, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize } = reqData;

    // console.log(category, `'category'`, color, `'color'`, sizes, `'size'`, minPrice, 'minPrice', maxPrice, 'maxPrice', minDiscount, `'minDiscount'`, sort, `'sort'`, stock, `'stock'`, pageNumber, `'pageNumber'`, pageSize, `'pageSize'`);

    try {

        const { data } = await api.get(`/api/products?color=${color}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`)



        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message })
    }
}



export const findProductsById = (reqData) => async (dispatch) => {

    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })

    const productId = reqData;

    try {
        const { data } = await api.get(`/api/products/id/${productId}`)

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}

export const addRatingForProduct = (reqData) => async (dispatch) => {

    try {

        const { data } = await api.post('/api/ratings/create', reqData)

        dispatch({ type: ADD_RATING, payload: data })
    } catch (error) {
        Error(error)
    }


}
export const addReviewForProduct = (reqData) => async (dispatch) => {

    try {

        const { data } = await api.post('/api/reviews/create', reqData)

        dispatch({ type: ADD_RATING, payload: data })
    } catch (error) {
        Error(error)
    }


}