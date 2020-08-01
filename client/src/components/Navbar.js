import React from "react";
import M from "materialize-css";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

class Navbar extends React.Component {
  newUpdates = [
    "Funnier bad word blocking",
    "Light/Dark modes",
    "Enhanced post effects",
    "Bug fixes",
    "Embedding websites",
  ];

  futureUpdates = [
    "Edit account",
    "Post images",
    "Profile image",
    "Image Filters",
    "Chat rooms",
    "Multiplayer games",
    "Inapropiate user reporting",
    "Reacting to posts (Like, Dislike, Question)",
    "Post commenting",
    "Post text color changing",
  ];

  componentDidMount() {
    const modal = M.Modal.init(this.Modal, {});

    if (window.location.pathname === "/") {
      modal.open();
    }
  }

  render() {
    return (
      <>
        <div
          id="future-updates"
          className="modal"
          ref={(Modal) => {
            this.Modal = Modal;
          }}
        >
          <div className="modal-content">
            <h4>Current Updates</h4>

            <ul>
              {this.newUpdates.map((update) => (
                <li key={update} className="mt-1">
                  <span style={{ cursor: "text" }}>• {update}</span>
                </li>
              ))}
            </ul>

            <h4>Future Updates</h4>

            <ul>
              {this.futureUpdates.map((update) => (
                <li key={update} className="mt-1">
                  <span style={{ cursor: "text" }}>• {update}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
                <li className="hide-on-small-only">
                  <a href="/embed">Website Sharing</a>
                </li>

                <li className="hide-on-small-only">
                  <a className="modal-trigger" href="#future-updates">
                    Updates
                  </a>
                </li>

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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
