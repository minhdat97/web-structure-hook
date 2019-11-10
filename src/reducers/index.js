import { combineReducers } from "redux";
import authLoginReducer from "./Login";
import usersReducer from "./User";

export default combineReducers({
  login: authLoginReducer,
  data: usersReducer
});
