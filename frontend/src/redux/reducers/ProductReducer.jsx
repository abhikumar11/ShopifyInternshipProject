import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS } from "../constants";


export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return { loading: true, products: [] };
        case ALL_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload };
        case ALL_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};


// Handles creating and deleting (admin/vendor actions)
export const productActionReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true };

        case NEW_PRODUCT_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, isDeleted: action.payload };

        case NEW_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };

        // IMPORTANT: Clear state so modals don't re-trigger
        case NEW_PRODUCT_RESET:
            return { ...state, success: false };

        case DELETE_PRODUCT_RESET:
            return { ...state, isDeleted: false };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};