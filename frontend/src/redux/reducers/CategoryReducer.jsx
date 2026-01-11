import { ALL_CATEGORIES_FAIL, ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS } from "../constants";

export const categoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      
        case ALL_CATEGORIES_REQUEST:
            return { ...state, loading: true };
        case ALL_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload };
        case ALL_CATEGORIES_FAIL:
            return { loading: false, error: action.payload };

        case NEW_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
        case "UPDATE_CATEGORY_REQUEST":
            return { ...state, loading: true };

        case NEW_CATEGORY_SUCCESS:
            return { 
                ...state,
                loading: false, 
                success: true, 
                categories: [...state.categories, action.payload] 
            };

        
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case "UPDATE_CATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

       
        case NEW_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
        case "UPDATE_CATEGORY_FAIL":
            return { ...state, loading: false, error: action.payload };

        
        case "NEW_CATEGORY_RESET":
            return { ...state, success: false };
        case "DELETE_CATEGORY_RESET":
            return { ...state, isDeleted: false };
        case "UPDATE_CATEGORY_RESET":
            return { ...state, isUpdated: false };

        case "CLEAR_ERRORS":
            return { ...state, error: null };

        default:
            return state;
    }
};