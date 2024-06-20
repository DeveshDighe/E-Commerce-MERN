import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import toast from "react-hot-toast"
import { getCart } from "../Cart/Action"

const token = localStorage.getItem('JwT')

const registerRequest = () => ({ type: REGISTER_REQUEST })
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user })
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error })

export const register = (userData) => async (dispatch) => {

    dispatch(registerRequest())

    try {
        const responce = await axios.post(`${API_BASE_URL}auth/signup`, userData)
        const user = responce.data;
        if (user.jwt) {
            // localStorage.setItem('JwT', user.jwt)
        }
        dispatch(registerSuccess(user))

        toast.success('registration successfull')
    } catch (error) {

        toast.error(error.response.data.message)
        dispatch(registerFailure(error.message))
    }
}



const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user })
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error })

export const login = (userData) => async (dispatch) => {

    dispatch(loginRequest())

    try {
        const responce = await axios.post(`${API_BASE_URL}auth/signin`, userData)
        const user = responce.data;
        if (user.jwt) {
            localStorage.setItem('JwT', user.jwt)
            dispatch(getUser(user.jwt))
        }
        dispatch(loginSuccess(user))

        toast.success('login successful')
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(loginFailure(error.message))
    }
}



const getUserRequest = () => ({ type: GET_USER_REQUEST })
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user })

const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error })

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());

    try {
        const headers = jwt ? { 'Authorization': `Bearer ${jwt}` } : {};

        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, { headers });

        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
};


// const removeCart = (user) => ({ type: GET_USER_SUCCESS, payload: user })

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null })
    dispatch(getCart())
    localStorage.removeItem('JwT')
    toast.success('logout successfull')

}