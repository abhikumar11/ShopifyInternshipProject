import {combineReducers, createStore,applyMiddleware}from "redux";
import {thunk} from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import StoreReducer from "./reducers/StoreReducer";
import { productActionReducer, productDetailsReducer, productReducer } from "./reducers/ProductReducer";
import { categoryReducer } from "./reducers/CategoryReducer";
import { adminOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/OrderReducer";
import { cartReducer } from "./reducers/CartReducer";
import {paymentReducer} from "./reducers/PaymentReducer";
import { dashboardReducer } from "./reducers/DasboardReducer";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const store=createStore(combineReducers({
    userAuth:AuthReducer,
    vendorStore:StoreReducer,
    allProducts: productReducer,
    newProduct: productActionReducer,
    allCategories: categoryReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    adminOrders: adminOrdersReducer,
    singleProduct:productDetailsReducer,
    cart:cartReducer,
    singleOrder:orderDetailsReducer,
    orderPayments:paymentReducer,
    adminStats: dashboardReducer
    
}),initialState,applyMiddleware(thunk));

export default store;