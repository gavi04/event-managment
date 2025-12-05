import axios from "axios";
import {
    ALL_EVENT_FAIL,
    ALL_EVENT_REQUEST,
    ALL_EVENT_SUCCESS,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_FAIL,
    EVENT_DETAILS_SUCCESS,
    ADMIN_EVENT_REQUEST,
    ADMIN_EVENT_SUCCESS,
    ADMIN_EVENT_FAIL,
    NEW_EVENT_REQUEST,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
    NEW_EVENT_RESET,
    DELETE_EVENT_REQUEST,
   DELETE_EVENT_SUCCESS,
   DELETE_EVENT_RESET,
    DELETE_EVENT_FAIL,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
   NEW_REVIEW_RESET,
   NEW_REVIEW_FAIL,
   ALL_REVIEW_REQUEST,
   ALL_REVIEW_SUCCESS,
   ALL_REVIEW_FAIL,
   DELETE_REVIEW_REQUEST,
   DELETE_REVIEW_SUCCESS,
   DELETE_REVIEW_FAIL,
     
     CLEAR_ERRORS} from "../constants/eventConstants"; 

     //Get All event details
    export const getEvent = (keyword="",currentPage=1, price = [0, 25000], category, ratings = 0) => async (dispatch) =>{
    
    try {
        dispatch({ type: ALL_EVENT_REQUEST });
        let link = `/api/v1/events?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
          link = `/api/v1/events?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
  
        const { data } = await axios.get(link);
        dispatch({
            type: ALL_EVENT_SUCCESS,
             payload:data,
            })
    }
          
      catch (error) {
    dispatch({
      type: ALL_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get event Details
export const getEventDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: EVENT_DETAILS_REQUEST });
  
      const { data} = await axios.get(`/api/v1/event/${id}`);
  
      dispatch({
        type: EVENT_DETAILS_SUCCESS,
        payload:data.event,
      });
    } catch (error) {
      dispatch({
        type: EVENT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // Get All Events For Admin
export const getAdminEvent = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EVENT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/events");

    dispatch({
      type: ADMIN_EVENT_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Create Event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/event/new`,
      eventData,
      config
    );

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
  // NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // Update Event
export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/event/${id}`,
      eventData,
      config
    );

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};


  // DELETE EVENT
  export const deleteEvent = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_EVENT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/event/${id}`);
  
      dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_EVENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
 // Get All Reviews of a Event
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Event
export const deleteReviews = (reviewId, eventId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&eventId=${eventId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
 
  


//clearing errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({ type: CLEAR_ERRORS });


}
