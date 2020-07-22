import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../helpers/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err.response && err.response.data ? err.response.data : err,
});

// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// User loading
export const setUserLoading = () => ({ type: USER_LOADING });

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) =>
      loginUser(
        { email: userData.email, password: userData.password },
        history
      )(dispatch)
    )
    .catch((err) => dispatch(getErrors(err)));
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));

      window.location.reload();
    })
    .then((res) => history.push("/"))
    .catch((err) => dispatch(getErrors(err)));
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from storage
  localStorage.removeItem("jwtToken");

  // Remove auth header
  setAuthToken(false);

  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const sendForgotEmail = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/forgot", userData)
    .then((res) => history.push("/"))
    .catch((err) => dispatch(getErrors(err)));
};

export const resetUserPassword = (data, history) => (dispatch) => {
  axios
    .post("/api/users/reset", data)
    .then((res) => {
      loginUser(
        { email: res.data.email, password: data.password },
        history
      )(dispatch);
    })
    .catch((err) => dispatch(getErrors(err)));
};

export const checkUserExists = (userId) => (dispatch) => {
  axios
    .post("/api/users/exists", { userId })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      if (err.response.data === false) {
        logoutUser()(dispatch);
        window.location.href = "./noaccount";
      }
    });
};
