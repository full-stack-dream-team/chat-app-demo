import React from "react";
import { Link } from "react-router-dom";

const Oops = () => (
  <div className="container">
    <div className="row">
      <div className="col s12">
        <h1>OOPS!</h1>
      </div>
    </div>

    <div className="row">
      <div className="col s12">
        <p>Something went wrong!</p>
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

export default Oops;
