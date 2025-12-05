import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_BOOKING_INFO,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, available) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/event/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        event: data.event._id,
        name: data.event.name,
        price: data.event.price,
        image: data.event.images[0].url,
        Available: data.event.Available,
        available,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // SAVE Booking INFO
  export const saveBookingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_BOOKING_INFO,
      payload: data,
    });
  
    localStorage.setItem("bookingInfo", JSON.stringify(data));
  };