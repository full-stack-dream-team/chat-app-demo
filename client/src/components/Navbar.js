import React from "react";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center hide-on-small-only">
              {this.props.auth.user.name || "Chat"}
            </a>
            <a href="/" className="brand-logo left ml-1 hide-on-med-and-up">
              {this.props.auth.user.name || "Chat"}
            </a>

            <ul id="nav-mobile" className="right">
              {this.props.auth.isAuthenticated ? (
                <li>
                  <a href="/" onClick={this.props.logoutUser}>
                    Log Out
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
