import { CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constatnts"
import axios from "axios";
export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });
    const { data, status } = await axios.post("http://localhost:3001/api/auth/register",formdata);

    if (status === 201 && data.success) {
      dispatch({type: CREATE_USER_SUCCESS,payload: data});
    } else {
      dispatch({type: CREATE_USER_FAIL,payload: data.msg});
    }
  } catch (err) {
    dispatch({
      type: CREATE_USER_FAIL,payload: err.response?.data?.msg || err.message});
  }
};
export const loginUser=(formdata)=>async(dispatch)=>{
      try {
         dispatch({ type:LOGIN_REQUEST});
         const {data,status}=await axios.post("http://localhost:3001/api/auth/login",formdata);
         if (status ===201&&data.user) {
          console.log(data.user);
          localStorage.setItem("token",data.token);
          dispatch({type:LOGIN_SUCCESS,payload: data});
      
    } else {
      dispatch({type: LOGIN_FAIL,payload: data.msg});
      console.log(data.msg)
    }
      } catch (err) {
        dispatch({type:LOGIN_FAIL,payload:err.response?.data?.msg||err.message});
      }
}
