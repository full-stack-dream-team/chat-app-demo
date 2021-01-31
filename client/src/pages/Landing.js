import React from "react";
import M from "materialize-css";
import { InlineIcon } from "@iconify/react";
import menuIcon from "@iconify/icons-mdi/menu";

import screenshot from "../images/chat-app.png";

class Landing extends React.Component {
  state = {
    tapTargetPulse: "pulse",
  };

  openTapTarget = () => {
    this.tapTargetInstance.open();
    this.setState({ tapTargetPulse: "" });
  };

  componentDidMount() {
    this.tapTargetInstance = M.TapTarget.init(this.TapTarget, {});

    M.Materialbox.init(this.Materialbox);
  }

  render() {
    return (
      <div className="container center">
        <div className="row">
          <div className="col s12">
            <h1>Chat App</h1>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <img
              src={screenshot}
              alt="Inventory Manager"
              className="materialboxed responsive-img mx-auto"
              width="650"
              ref={(Materialbox) => (this.Materialbox = Materialbox)}
              data-caption="Inventory Manager Preview"
            />
          </div>

          <div className="col s12">
            <h4 className="flow-text">
              To experience the Chat App, you MUST be logged into an account.
            </h4>
            <h5>Test credentials are provided on the login page.</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <a href="/login" className="btn">
              Log In
            </a>
          </div>
        </div>

        <div className="fixed-action-btn direction-top">
          <button
            id="menu"
            className={`btn btn-floating btn-large pink lighten-1 ${this.state.tapTargetPulse}`}
            onClick={this.openTapTarget}
          >
            <InlineIcon
              icon={menuIcon}
              width="24px"
              height="24px"
              style={{ verticalAlign: "middle" }}
            />
          </button>
        </div>
        <div
          className="tap-target blue lighten-1"
          data-target="menu"
          ref={(TapTarget) => {
            this.TapTarget = TapTarget;
          }}
        >
          <div className="tap-target-content">
            <h5>Get Ready for Some Fun</h5>
            <p>
              This demo app is packed with some fun features. Includes color
              coding messages, emojis, image uploader and special effects.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
