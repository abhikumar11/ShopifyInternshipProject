import {combineReducers, createStore,applyMiddleware}from "redux";
import {thunk} from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import StoreReducer from "./reducers/StoreReducer";


const store=createStore(combineReducers({
    userAuth:AuthReducer,
    vendorStore:StoreReducer
}),applyMiddleware(thunk));

export default store;