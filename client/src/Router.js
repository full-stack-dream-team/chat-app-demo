import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";
import NotPrivateRoute from "./components/NotPrivateRoute";

import App from "./pages/App";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Oops from "./pages/Oops";
import Error404 from "./pages/Error404";

class Router extends React.Component {
  protectedComponent = (needsAuth, fallback) =>
    this.props.auth.isAuthenticated ? needsAuth : fallback;

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <NotPrivateRoute exact path="/landing" component={Landing} />
          <NotPrivateRoute exact path="/register" component={Register} />
          <NotPrivateRoute exact path="/login" component={Login} />
          <NotPrivateRoute
            exact
            path="/forgotpassword"
            component={ForgotPassword}
          />
          <NotPrivateRoute
            exact
            path="/resetpassword/:token"
            component={ResetPassword}
          />
          <Route exact path="/oops" component={Oops} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Router);
