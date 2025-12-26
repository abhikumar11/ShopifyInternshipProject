import axios from "axios"
import { CREATE_STORE_REQUEST,CREATE_STORE_SUCCESS,CREATE_STORE_FAIL, LOAD_STORE_REQUEST, LOAD_STORE_SUCCESS, LOAD_STORE_FAIL } from "../constatnts";

export const createStore=(formdata)=>async(dispatch)=>{
    try {
            dispatch({type:CREATE_STORE_REQUEST});
            const token=localStorage.getItem("token");
            console.log(formdata);
            const {data,status}=await axios.post("http://localhost:3001/api/vendor/newstore",formdata,{headers:{
                "authorization":token
            }});
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
export const loadStore=()=>async(dispatch)=>{
    try {
        const token=localStorage.getItem("token");
        dispatch({type:LOAD_STORE_REQUEST});
        const {data}=await axios.get("http://localhost:3001/api/vendor/getstore",{
            headers:{
                "authorization":token
            }
        });
        dispatch({type:LOAD_STORE_SUCCESS,payload:data});
    } catch (err) {
         dispatch({type:LOAD_STORE_FAIL,payload:err.response?.data?.msg||err.message});
    }
}