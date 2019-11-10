import React from "react";
import "./index.css";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import MainTemplate from "../Template/MainTemplate";

export const DataContext = React.createContext();

export const Home = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  console.log("state in home", state);
  React.useEffect(() => {
    dispatch({
      type: "FETCH_DATA_REQUEST"
    });
    axios("https://sbx-account.payme.vn/Account/Information", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.login.token}`
      }
    })
      .then(res => {
        console.log("res in Home", res);
        if (res.data.code === 1000) {
          return res;
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log("resJson Home", resJson);
        dispatch({
          type: "FETCH_DATA_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_DATA_FAILURE"
        });
      });
  }, [dispatch, state.login.token]);
  console.log(state);
  return (
    <MainTemplate>
      <main role="main">
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <div>
            {state.data.datas && (
              <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h2>Profile for {state.data.datas.data.data.fullname}</h2>

                  {/* <ChangePassword /> */}
                </div>

                <div>
                  <ul>
                    <li>Gender: {state.data.datas.data.data.gender}</li>
                    <li>
                      Email address:{" "}
                      {state.data.datas.data.data.email
                        ? state.data.datas.data.data.email
                        : "N/A"}
                    </li>
                    <li>Phone: +{state.data.datas.data.data.phone}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </MainTemplate>
  );
};

export default Home;
