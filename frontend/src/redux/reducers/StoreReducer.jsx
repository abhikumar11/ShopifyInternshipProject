import { ALL_STORES_FAIL, ALL_STORES_REQUEST, ALL_STORES_SUCCESS, CLEAR_ERRORS, CREATE_STORE_FAIL, CREATE_STORE_REQUEST, CREATE_STORE_SUCCESS, LOAD_STORE_FAIL, LOAD_STORE_REQUEST, LOAD_STORE_SUCCESS, RESET_STORE_STATE } from "../constants";


const initialState = {
    loading: false, 
    stores: [],        // For Admin List
    store: null,       // For Single Vendor
    storestatus: null,
    success: false,
    isUpdated: false,  // For Admin Actions
    isDeleted: false,  // For Admin Actions
    error: null,
    message: null
};

const StoreReducer = (state = initialState, action) => {
    switch (action.type) {
        // --- REQUESTS ---
        case CREATE_STORE_REQUEST:
        case LOAD_STORE_REQUEST:
        case ALL_STORES_REQUEST:
        case "UPDATE_STORE_REQUEST":
        case "DELETE_STORE_REQUEST":
            return { 
                ...state, 
                loading: true, 
                error: null, 
                success: false 
            };

        // --- SUCCESS: VENDOR ACTIONS ---
        case CREATE_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.msg,
                store: action.payload.store,
                storestatus: action.payload.status,
            };

        case LOAD_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                store: action.payload.store || null,
                storestatus: action.payload.store?.status || null
            };

        // --- SUCCESS: ADMIN ACTIONS ---
        case ALL_STORES_SUCCESS:
            return {
                ...state,
                loading: false,
                stores: action.payload
            };

        case "UPDATE_STORE_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload, // returns true
                message: "Store status updated successfully"
            };

        case "DELETE_STORE_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload, // returns true
                message: "Store removed from system"
            };

        // --- FAILURES ---
        case CREATE_STORE_FAIL:
        case LOAD_STORE_FAIL:
        case ALL_STORES_FAIL:
        case "UPDATE_STORE_FAIL":
        case "DELETE_STORE_FAIL":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                message: action.payload
            };

        // --- RESETS & CLEANUP ---
        case "UPDATE_STORE_RESET":
            return {
                ...state,
                isUpdated: false
            };

        case "DELETE_STORE_RESET":
            return {
                ...state,
                isDeleted: false
            };

        case RESET_STORE_STATE:
            return {
                ...state,
                success: false,
                error: null,
                message: null
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};

export default StoreReducer;