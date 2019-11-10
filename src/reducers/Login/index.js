import { setStoreApplication, removeStoreApplication } from "../../utils/store";

const initialState = {
  isAuthenticated: false,
  // user: null,
  token: null,
  error: "",
  errorCode: "",
  errorDetailLogin: ""
};

const authLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      action.payload.token
        ? setStoreApplication("session", "token", action.payload.token)
        : setStoreApplication(
            "session",
            "token",
            action.payload.data.data.accessToken
          );
      return {
        ...state,
        isAuthenticated: true,
        // user: action.payload.user,
        token: action.payload.token
          ? action.payload.token
          : action.payload.data.data.accessToken
      };

    case "REQUEST_ERROR_LOGIN":
      return {
        ...state,
        error: action.payload.error,
        errorCode: action.payload.errorCode,
        errorDetailLogin: action.payload.errorDetailLogin
      };
    case "LOGOUT":
      removeStoreApplication("session", "login");
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authLoginReducer;
