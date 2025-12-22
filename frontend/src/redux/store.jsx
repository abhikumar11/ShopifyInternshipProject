import {combineReducers, createStore,applyMiddleware}from "redux";
import {thunk} from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";


const store=createStore(combineReducers({
    userAuth:AuthReducer,
}),applyMiddleware(thunk));

export default store;