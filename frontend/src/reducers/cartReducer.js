import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_BOOKING_INFO,
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], boookingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.event === item.event
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.event === isItemExist.event ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.event !== action.payload),
        };
  
      case SAVE_BOOKING_INFO:
        return {
          ...state,
          bookingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };