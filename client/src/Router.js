import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";
import NotPrivateRoute from "./components/NotPrivateRoute";
import Navbar from "./components/Navbar";
import EffectCanvas from "./components/EffectCanvas";

import EmbedWebsite from "./pages/EmbedWebsite";

import App from "./pages/App";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import User from "./pages/User";
import Oops from "./pages/Oops";
import NoAccount from "./pages/NoAccount";
import Error404 from "./pages/Error404";

class Router extends React.Component {
  protectedComponent = (needsAuth, fallback) =>
    this.props.auth.isAuthenticated ? needsAuth : fallback;

  render() {
    return (
      <BrowserRouter>
        <EffectCanvas effect={this.props.effect} />

        {this.props.postsLoading ? null : <Navbar />}

        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <PrivateRoute exact path="/user/:userId" component={User} />

          <PrivateRoute exact path="/embed" component={EmbedWebsite} />

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

          <NotPrivateRoute exact path="/noaccount" component={NoAccount} />
          <Route exact path="/oops" component={Oops} />
          <Route component={Error404} />
        </Switch>

        <span
          className="dark-light"
          style={{
            zIndex: "1000",
            position: "fixed",
            left: "20px",
            bottom: "20px",
          }}
        >
          v 1.2.5
        </span>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  postsLoading: state.chat.postsLoading,
});

export default connect(mapStateToProps)(Router);
