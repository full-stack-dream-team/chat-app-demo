import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

class App extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

export default connect(undefined, { logoutUser })(App);
