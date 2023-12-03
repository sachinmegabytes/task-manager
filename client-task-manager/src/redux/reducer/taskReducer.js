import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    EDIT_TASK_REQUEST,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
  } from "../actions/actionTypes";
  
  
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TASK_REQUEST:
      case EDIT_TASK_REQUEST:
      case DELETE_TASK_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case ADD_TASK_SUCCESS:
      case EDIT_TASK_SUCCESS:
      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
  
      case ADD_TASK_FAILURE:
      case EDIT_TASK_FAILURE:
      case DELETE_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default taskReducer;
  