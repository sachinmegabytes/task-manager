import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  GET_USER_REQUEST,
} from "./actions/actionTypes";

const initialState = {
  user: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        user: [],
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
