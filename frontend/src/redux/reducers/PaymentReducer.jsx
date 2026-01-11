import { ALL_PAYMENTS_FAIL, ALL_PAYMENTS_REQUEST, ALL_PAYMENTS_SUCCESS, CLEAR_ERRORS } from "../constants";


const initialState = {
    loading: false,
    payments: [],
    error: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PAYMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_PAYMENTS_SUCCESS:
            return {
                loading: false,
                payments: action.payload,
                error: null,
            };

        case ALL_PAYMENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
