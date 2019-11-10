import React from "react";
import "./App.css";
import Login from "./components/Login/index";
import Home from "./components/Home/index";
// import Header from "./components/Header";
import reducer from "./reducers";
import { getDataStore } from "./utils/store";

export const AuthContext = React.createContext();

const initialState = {
  login: {},
  // user: null,
  data: {}
};

function AuthProvider() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log("state", state);

  React.useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('user'))
    const token = getDataStore("session", "token");
    console.log("token", token);
    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token
        }
      });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {/* <Header /> */}
      <div>{!state.login.isAuthenticated ? <Login /> : <Home />}</div>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
