import {
     CREATE_STORE_FAIL,
     CREATE_STORE_REQUEST,
     CREATE_STORE_SUCCESS,
     LOAD_STORE_REQUEST,
     LOAD_STORE_SUCCESS,
     LOAD_STORE_FAIL
} from "../constatnts";

const initialState = {
     loading: false,
     storestatus: null,
     error: null,
     message: null,
     success:false,
     store:null
};
const StoreReducer = (state = initialState, action) => {
     switch (action.type) {
          case CREATE_STORE_REQUEST:
               return { ...state, loading: true, message: null, error: null,success:false };
          case CREATE_STORE_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    message: action.payload.msg,
                    storestatus: action.payload.status,
                    success:true,
               };
          case CREATE_STORE_FAIL:
               return {
                    ...state,
                    loading: false,
                    message: action.payload.msg,
                    storestatus: null,
                    success:false,
               };
          case LOAD_STORE_REQUEST:
               return {...state,loading:true,message:null,success:false,store:null};
          case LOAD_STORE_SUCCESS:
               return {...state,loading:false,success:true,store:action.payload.store}
          case LOAD_STORE_FAIL:
               return {...state,loading:false,success:false,error:action.payload.msg}
          default:
               return state;
     }
};
export default StoreReducer;
