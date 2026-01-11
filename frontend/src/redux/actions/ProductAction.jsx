import axios from "axios";
import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS } from "../constants";

export const getProducts=()=>async(dispatch)=>{
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const { data } = await axios.get("http://localhost:3001/api/pro/allproduct");
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
        dispatch({ type: ALL_PRODUCTS_FAIL, payload: error.response.data.message });
    }
};
const API_BASE = "http://localhost:3001/api";

// [Vendor/Admin] Add New Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const token = localStorage.getItem("token");

        const { data } = await axios.post("http://localhost:3001/api/pro/newproduct", productData, {
            headers: { 
                "authorization": token,
                "Content-Type": "multipart/form-data" // For images
            }
        });

        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: NEW_PRODUCT_FAIL, payload: err.response?.data?.msg || err.message });
    }
};
export const getVendorProducts = (storeId) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`http://localhost:3001/api/pro/vendor/${storeId}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response?.data?.msg || error.message,
        });
    }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

    const { data } = await axios.get(`http://localhost:3001/api/pro/productdetails/${id}`);

    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: data.product, 
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload: error.response?.data.message || error.message,
    });
  }
};