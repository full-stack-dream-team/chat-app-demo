import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";
import NotPrivateRoute from "./components/NotPrivateRoute";
import Navbar from "./components/Navbar";

import TestGame from "./pages/games/TestGame";

import App from "./pages/App";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Oops from "./pages/Oops";
import NoAccount from "./pages/NoAccount";
import Error404 from "./pages/Error404";

class Router extends React.Component {
  protectedComponent = (needsAuth, fallback) =>
    this.props.auth.isAuthenticated ? needsAuth : fallback;

  render() {
    return (
      <BrowserRouter>
        {this.props.postsLoading ? null : <Navbar />}

        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={
              <App
                postMessage={this.props.postMessage}
                deletePost={this.props.deletePost}
                editPost={this.props.editPost}
                makeChatBoxRef={this.props.makeChatBoxRef}
                chat={this.props.chat}
              />
            }
          />

          <PrivateRoute
            exact
            path="/testgame"
            component={
              <TestGame
                postMessage={this.props.postMessage}
                deletePost={this.props.deletePost}
                makeChatBoxRef={this.props.makeChatBoxRef}
                chat={this.props.chat}
              />
            }
          />

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
          style={{
            zIndex: "1000",
            position: "fixed",
            left: "20px",
            bottom: "20px",
          }}
        >
          v 1.1.0 beta
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
