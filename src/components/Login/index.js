import React from "react";
import { sha256 } from "js-sha256";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import "./index.css";

export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    account: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    axios("https://sbx-account.payme.vn/Account/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        account: data.account,
        password: sha256(data.password)
      })
    })
      .then(res => {
        console.log("res", res);
        if (res.data.code === 1000) {
          return res;
        }
        throw res;
      })
      .then(resJson => {
        console.log("Resjson Login", resJson);
        dispatch({
          type: "LOGIN",
          payload: resJson
        });
      })
      .catch(error => {
        console.log("error", error);
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.data.data.message
        });
      });
  };

  return (
    <div className="text-center">
      {data.errorMessage && (
        <span className="form-error">{data.errorMessage}</span>
      )}
      <form className="form-signin" onSubmit={handleFormSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Xin Đăng nhập</h1>
        <label htmlFor="inputPhone" className="sr-only">
          Account
        </label>
        <input
          type="phone"
          id="inputPhone"
          className="form-control"
          name="account"
          onChange={handleInputChange}
          value={data.account}
          placeholder="Account"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          name="password"
          onChange={handleInputChange}
          value={data.password}
          placeholder="Password"
          required
        />
        <button
          className="btn btn-lg btn-outline-primary btn-block"
          type="submit"
        >
          Đăng nhập
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
      </form>
    </div>
  );
};

export default Login;
