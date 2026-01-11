import {
    DASHBOARD_DATA_REQUEST,
    DASHBOARD_DATA_SUCCESS,
    DASHBOARD_DATA_FAIL,
    CLEAR_ERRORS
} from "../constants";

export const dashboardReducer = (state = { stats: {} }, action) => {
    switch (action.type) {
        case DASHBOARD_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                stats: action.payload,
            };

        case DASHBOARD_DATA_FAIL:
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