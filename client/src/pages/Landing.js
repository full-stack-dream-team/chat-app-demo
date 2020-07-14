import React from "react";

class Landing extends React.Component {
  render() {
    return (
      <div className="container center">
        <div className="row">
          <div className="col s12">
            <h3>Please register or log in to experience this app.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <a href="/register" className="btn">
              Register
            </a>
          </div>
          <div className="col s6">
            <a href="/login" className="btn">
              Log In
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
