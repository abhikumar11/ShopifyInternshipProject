import axios from "axios";

export const addToCart = (id, quantity, variant) => async (dispatch, getState) => {
  try {

    const { data } = await axios.get(`http://localhost:3001/api/pro/productdetails/${id}`);

    const productData = data.product;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: productData._id,
        title: productData.title,
        price: productData.price,
        image: productData.images[0],
        stock: productData.stock,
        storeName: productData.storeId?.name || "Official Store",
        variant: variant, 

        quantity: Number(quantity), 

      },
    });

    const { cart: { cartItems } } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  } catch (error) {
    console.error("Add to cart failed:", error.response?.data?.message || error.message);

  }
};

export const removeFromCart = (id, variant) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: { id, variant },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const createRazorpayOrder = (amount) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:3001/api/payment/order", { amount });
    if (data.success) {
      return data.order; 

    }
  } catch (error) {
    console.error("Order Creation Error:", error.response?.data?.message || error.message);
    return null;
  }
};

export const verifyPayment = (paymentData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:3001/api/payment/verify", paymentData);

    if (data.success) {

      dispatch({ type: "CLEAR_CART" });

      localStorage.removeItem("cartItems");

      return data; 

    }
    return { success: false };
  } catch (err) {
    console.error("Payment Verification Error:", err.response?.data?.message);
    return { success: false };
  }
};