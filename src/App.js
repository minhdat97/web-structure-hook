import React from "react";
// import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import AuthDataProvider from "./AuthProvider";
import history from "./history";
import Routes from "./routes";

const App = props => (
  <Router history={history}>
    <AuthDataProvider>
      <Routes />
    </AuthDataProvider>
  </Router>
);

export default App;
