import axios from "axios"
import { CREATE_STORE_REQUEST,CREATE_STORE_SUCCESS,CREATE_STORE_FAIL } from "../constatnts";

export const createStore=(formdata)=>async(dispatch)=>{
    try {
            dispatch({type:CREATE_STORE_REQUEST})
            const {data,status}=await axios.post("http://localhost:3001/api/vendor/newstore",formdata);
            if(status==201){
                dispatch({type:CREATE_STORE_SUCCESS,payload:data});
            }
            else{
                dispatch({type:CREATE_STORE_FAIL,payload:data});
            }
    } catch (err) {
        dispatch({type:CREATE_STORE_FAIL,payload:err.response?.data?.msg||err.message});
    }
}