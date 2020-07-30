import React from "react";

class NoAccount extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h2>No Account</h2>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <h6>
              Either your account was deleted, banned, or it never existed in
              the first place.
            </h6>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <blockquote>
              Want to make a new account? <a href="/register">Register</a>
              <br />
              Have another account to go to? <a href="/login">Log In</a>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

export default NoAccount;
