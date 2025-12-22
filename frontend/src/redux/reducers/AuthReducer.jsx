import { CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS,LOGOUT } from "../constatnts";


const initialState = {
  loading: false,
  user: null,
  token: localStorage.getItem("token") || null,
  success: false,
  error: null,
  message: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null, success: false, message: null };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload.user,
        message: action.payload.msg,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.msg,
        error: null,
      };

    case CREATE_USER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        success: false,
        error: null,
        message: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
