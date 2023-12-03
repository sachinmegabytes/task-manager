import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducer";
import taskReducer from "./reducer/taskReducer";

const rootReducer = combineReducers({
    authReducer: authReducer, 
    taskReducer: taskReducer, 
   
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
