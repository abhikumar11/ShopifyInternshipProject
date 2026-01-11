import axios from "axios";
import { ALL_STORES_FAIL, ALL_STORES_REQUEST, ALL_STORES_SUCCESS, CLEAR_ERRORS, CREATE_STORE_FAIL, CREATE_STORE_REQUEST, CREATE_STORE_SUCCESS, LOAD_STORE_FAIL, LOAD_STORE_REQUEST, LOAD_STORE_SUCCESS } from "../constants";

const API_BASE = "http://localhost:3001/api/vendor";
const ADMIN_API = "http://localhost:3001/api/admin";

export const createStore = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_STORE_REQUEST });
        const token = localStorage.getItem("token");

        const { data } = await axios.post(`${API_BASE}/newstore`, formdata, {
            headers: { "authorization": `Bearer ${token}` }
        });

        dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ 
            type: CREATE_STORE_FAIL, 
            payload: err.response?.data?.msg || "Creation failed" 
        });
    }
};

export const loadStore = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_STORE_REQUEST });
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${API_BASE}/getstore`, {
            headers: { "authorization": `Bearer ${token}` }
        });

        dispatch({ type: LOAD_STORE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ 
            type: LOAD_STORE_FAIL, 
            payload: err.response?.data?.msg || "Loading failed" 
        });
    }
};

export const getAdminStores = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_STORES_REQUEST });
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${ADMIN_API}/stores`, {
            headers: { "authorization": `Bearer ${token}` }
        });

        dispatch({ type: ALL_STORES_SUCCESS, payload: data.stores });
    } catch (err) {
        dispatch({ type: ALL_STORES_FAIL, payload: err.response?.data?.msg });
    }
};

export const updateStoreStatus = (id, statusData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_STORE_REQUEST" });
        const token = localStorage.getItem("token");

        const { data } = await axios.put(`${ADMIN_API}/store/${id}`, statusData, {
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}` 
            }
        });

        dispatch({ type: "UPDATE_STORE_SUCCESS", payload: data.success });
    } catch (err) {
        dispatch({ type: "UPDATE_STORE_FAIL", payload: err.response?.data?.msg });
    }
};

export const deleteStore = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_STORE_REQUEST" });
        const token = localStorage.getItem("token");

        const { data } = await axios.delete(`${ADMIN_API}/store/${id}`, {
            headers: { "authorization": `Bearer ${token}` }
        });

        dispatch({ type: "DELETE_STORE_SUCCESS", payload: data.success });
    } catch (err) {
        dispatch({ type: "DELETE_STORE_FAIL", payload: err.response?.data?.msg });
    }
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};