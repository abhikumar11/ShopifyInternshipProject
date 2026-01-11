

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const item = action.payload;

      const isMatch = (i) => 
        i.product === item.product && 
        JSON.stringify(i.variant) === JSON.stringify(item.variant);

      const existItem = state.cartItems.find(isMatch);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => (isMatch(i) ? item : i)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,

        cartItems: state.cartItems.filter(
          (i) =>
            !(
              i.product === action.payload.product &&
              JSON.stringify(i.variant) === JSON.stringify(action.payload.variant)
            )
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};