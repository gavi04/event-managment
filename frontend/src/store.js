import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { eventDetailsReducer, eventsReducer,newReviewReducer,newEventReducer, eventReducer, eventReviewsReducer, reviewReducer} from "./reducers/eventReducer";
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
  } from "./reducers/userReducer";
  import { cartReducer } from "./reducers/cartReducer";
import { myBookingsReducer, newBookingReducer,bookingDetailsReducer, allBookingsReducer, bookingReducer } from "./reducers/bookingReducer";
// Combine your reducers
const reducer = combineReducers({
  events: eventsReducer,
  eventDetails: eventDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newReview: newReviewReducer,
  newBooking:newBookingReducer,
  newEvent:newEventReducer,
  myBookings:myBookingsReducer,
  bookingDetails: bookingDetailsReducer,
  event:eventReducer,
  allBookings:allBookingsReducer,
  booking: bookingReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  eventReviews:eventReviewsReducer,
  review:reviewReducer,
 
});

// Define your initial state if needed
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    bookingInfo: localStorage.getItem("bookingInfo")
      ? JSON.parse(localStorage.getItem("bookingInfo"))
      : {},
  },
};

// Define your middleware array
const middleware = [thunk];

// Create the Redux store
const store = createStore(
  reducer,
  initialState, // You can remove this if you don't have an initial state
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
