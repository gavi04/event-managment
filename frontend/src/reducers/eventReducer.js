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
    NEW_REVIEW_REQUEST,
    DELETE_EVENT_REQUEST,
   DELETE_EVENT_SUCCESS,
   DELETE_EVENT_RESET,
    DELETE_EVENT_FAIL,
    UPDATE_EVENT_REQUEST,
UPDATE_EVENT_SUCCESS,
UPDATE_EVENT_RESET,
UPDATE_EVENT_FAIL,
  NEW_REVIEW_SUCCESS,
 NEW_REVIEW_RESET,
 NEW_REVIEW_FAIL,
 ALL_REVIEW_REQUEST,
   ALL_REVIEW_SUCCESS,
   ALL_REVIEW_FAIL,
   DELETE_REVIEW_REQUEST,
   DELETE_REVIEW_SUCCESS,
   DELETE_REVIEW_FAIL,
   DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
} from "../constants/eventConstants"; 

export const eventsReducer = (state = { loading: false,events: [] }, action) => {
    switch (action.type) {
        case ALL_EVENT_REQUEST:
        case ADMIN_EVENT_REQUEST:
            return {
                loading: true,
                events: [],
            };
        case ALL_EVENT_SUCCESS:
            return {
                loading: false,
                events: action.payload.events,
                eventsCount: action.payload.eventsCount,
                resultPerPage:action.payload.resultPerPage,
                filteredEventsCount:action.payload.filteredEventsCount,
            };
            case ADMIN_EVENT_SUCCESS:
            return {
                loading: false,
                events: action.payload,
               
            };
        case ALL_EVENT_FAIL:
          case ADMIN_EVENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_EVENT_FAIL:
    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EVENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_EVENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const eventDetailsReducer = (state = {event: {} }, action) => {
    switch (action.type) {
      case EVENT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
        case EVENT_DETAILS_SUCCESS:
            return {
              loading: false,
              event: action.payload,  // Ensure that 'event' is correctly accessed from the payload
            };
          
      case EVENT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const newEventReducer = (state = { event: {} }, action) => {
    switch (action.type) {
      case NEW_EVENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_EVENT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          event: action.payload.event,
        };
      case NEW_EVENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_EVENT_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const eventReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  