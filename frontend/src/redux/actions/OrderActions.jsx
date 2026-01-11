import axios from 'axios';
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS } from '../constants';



export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await axios.post('/api/v1/order/new', order);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }
};
export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { userAuth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get("http://localhost:3001/api/order/getorder", config);

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.order, 
        });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

       
        const { userAuth: { token } } = getState();

        const config = {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        };

        const { data } = await axios.get("http://localhost:3001/api/admin/orders", config);

        dispatch({ 
            type: ALL_ORDERS_SUCCESS, 
            payload: data.order 
        });

    } catch (error) {
        dispatch({ 
            type: ALL_ORDERS_FAIL, 
            payload: error.response?.data?.msg || error.message 
        });
    }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: "ORDER_DETAILS_REQUEST" });
        const { userAuth: { token } } = getState();

        const { data } = await axios.get(`http://localhost:3001/api/order/orderdetail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
                console.log("first",data);
        dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data.order });
    } catch (error) {
        dispatch({ type: "ORDER_DETAILS_FAIL", payload: error.message });
    }
};
export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: "ORDER_DETAILS_REQUEST" });
        const { userAuth: { token } } = getState();

        const { data } = await axios.get(`http://localhost:3001/api/admin/order/orderdetail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
                console.log("first",data);
        dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data.order });
    } catch (error) {
        dispatch({ type: "ORDER_DETAILS_FAIL", payload: error.message });
    }
};

export const updateOrderStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: "UPDATE_ORDER_REQUEST" });

        const { userAuth: { token } } = getState();
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            `http://localhost:3001/api/admin/order/${id}`, 
            { status }, 
            config
        );

        dispatch({
            type: "UPDATE_ORDER_SUCCESS",
            
            payload: data.success, 
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_ORDER_FAIL",
           
            payload: error.response?.data?.msg || "Failed to update order status",
        });
    }
};
export const clearErrors = () => async (dispatch) => {
    dispatch({type: "CLEAR_ERRORS"});
};