import axios from 'axios';
import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, CLEAR_ERRORS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS } from '../constants';

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORIES_REQUEST });
        
      
        const { data } = await axios.get("http://localhost:3001/api/cat/categorylist");
        
        dispatch({ 
            type: ALL_CATEGORIES_SUCCESS, 
            payload: data.categories 
        });
    } catch (error) {
        dispatch({ 
            type: ALL_CATEGORIES_FAIL, 
            payload: error.response?.data?.message || "Failed to fetch categories" 
        });
    }
};

// --- [Admin] Create New Category ---
export const createCategory = (catdata) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });

        const { userAuth: { token } } = getState();
        const config = {
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        };

        const { data } = await axios.post('http://localhost:3001/api/cat/newcategory',catdata, config);

        dispatch({ 
            type: NEW_CATEGORY_SUCCESS, 
            payload: data.category 
        });
    } catch (error) {
        dispatch({ 
            type: NEW_CATEGORY_FAIL, 
            payload: error.response?.data?.message || "Failed to create category" 
        });
    }
};


export const updateCategory = (id, categoryData) => async (dispatch, getState) => {
    try {
        dispatch({ type: "UPDATE_CATEGORY_REQUEST" });

        const { userAuth: { token } } = getState();
        const config = {
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        };

        const { data } = await axios.put(`http://localhost:3001/api/cat/catedit/${id}`, categoryData, config);

        dispatch({ 
            type: "UPDATE_CATEGORY_SUCCESS", 
            payload: data.success 
        });
    } catch (error) {
        dispatch({ 
            type: "UPDATE_CATEGORY_FAIL", 
            payload: error.response?.data?.message || "Update failed" 
        });
    }
};


export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { userAuth: { token } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const { data } = await axios.delete(`http://localhost:3001/api/cat/delcat/${id}`, config);

        dispatch({ 
            type: DELETE_CATEGORY_SUCCESS, 
            payload: data.success 
        });
    } catch (error) {
        dispatch({ 
            type: DELETE_CATEGORY_FAIL, 
            payload: error.response?.data?.message || "Delete failed" 
        });
    }
};

// --- Clear Errors ---
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};