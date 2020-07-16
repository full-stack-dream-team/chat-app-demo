import React from "react";
import ReactDOM from "react-dom";
import ChatFunc from "./ChatFunc";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./helpers/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import store from "./redux/store/index";
import * as serviceWorker from "./serviceWorker";

import "./sass/index.scss";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChatFunc />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
