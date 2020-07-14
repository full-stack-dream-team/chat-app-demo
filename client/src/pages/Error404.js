import React from "react";

const Error404 = () => (
  <div className="container">
    <div className="row">
      <div className="col s12">
        <h2>This is a 404 message!</h2>
      </div>
    </div>

    <div className="row">
      <div className="col s12">
        <h4>
          This means that either this page has been removed, or never even
          existed.
        </h4>
      </div>
    </div>

    <div className="row">
      <div className="col s12">
        <a href="/" className="btn">
          Home
        </a>
      </div>
    </div>
  </div>
);

export default Error404;
