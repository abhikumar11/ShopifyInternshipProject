import axios from "axios";
import { ALL_PAYMENTS_FAIL, ALL_PAYMENTS_REQUEST, ALL_PAYMENTS_SUCCESS, CLEAR_ERRORS } from "../constants";

const BASE_API = "http://localhost:3001/api/admin";
export const getPaymentLedger = () => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_PAYMENTS_REQUEST });
        
        const token = localStorage.getItem("token");
        const config = { headers: { "authorization": `Bearer ${token}` } };

        const { data } = await axios.get(`${BASE_API}/paymentledger`, config);
        console.log("first",data)
        dispatch({ 
            type: ALL_PAYMENTS_SUCCESS, 
            payload: data.payments 
        });
    } catch (error) {
        dispatch({ 
            type: ALL_PAYMENTS_FAIL, 
            payload: error.response?.data?.message || "Failed to fetch ledger" 
        });
    }
};
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};