import {
     CREATE_STORE_FAIL,
     CREATE_STORE_REQUEST,
     CREATE_STORE_SUCCESS,
} from "../constatnts";

const initialState = {
     loading: false,
     storestatus: null,
     error: null,
     message: null,
};
const StoreReducer = (state = initialState, action) => {
     switch (action.type) {
          case CREATE_STORE_REQUEST:
               return { ...state, loading: true, message: null, error: null };
          case CREATE_STORE_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    message: action.payload.msg,
                    storestatus: action.payload.status,
               };
          case CREATE_STORE_FAIL:
               return {
                    ...state,
                    loading: false,
                    message: action.payload.msg,
                    storestatus: null,
               };
          default:
               return state;
     }
};
export default StoreReducer;
