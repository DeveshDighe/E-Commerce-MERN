import { ADD_RATING, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_HOME_PRODUCT } from "./ActionType.js"

const initialState = {
    products : [],
    product : null,
    loading : false,
    rating : null,
    error : null
}
export const customerProductReducer = (state = initialState , action) => {
    switch(action.type){

        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return {...state, loading: true, error : null}

        case GET_HOME_PRODUCT:
        case FIND_PRODUCTS_SUCCESS:
            return {...state, loading:false , error : null, products:action.payload}

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state, loading: false ,error :null , product:action.payload}
        case ADD_RATING:
            return {...state, rating : action.payload}
        case FIND_PRODUCT_BY_ID_FAILURE:
        case FIND_PRODUCTS_FAILURE :
            return {...state, loading:false, error:action.payload}

        

        default :
            return state
    }

}