import axios from 'axios';
import {
    DASHBOARD_DATA_REQUEST,
    DASHBOARD_DATA_SUCCESS,
    DASHBOARD_DATA_FAIL,
    CLEAR_ERRORS
} from "../constants";

const BASE_API = "http://localhost:3001/api/admin";
export const getAdminDashboardData = () => async (dispatch) => {
    try {
         const token = localStorage.getItem("token");
        const config = { headers: { "authorization": `Bearer ${token}` } };
        dispatch({ type: DASHBOARD_DATA_REQUEST });

        const { data } = await axios.get(`${BASE_API}/stats`,config);

        dispatch({
            type: DASHBOARD_DATA_SUCCESS,
            payload: data.data, 

        });
    } catch (error) {
        dispatch({
            type: DASHBOARD_DATA_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};