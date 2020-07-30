import React from "react";
import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";

import { connect } from "react-redux";

class SideChatBox extends React.Component {
  state = {
    content: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="side-chat-box z-depth-2 col s3">
        <div className="chat-area" ref={this.props.makeChatBoxRef}>
          <ul ref={this.props.makeChatBoxRef}>
            {this.props.chat.map((msg, i) => (
              <li key={msg._id || i}>
                <div>
                  <span className="name">{msg.name}</span>
                </div>

                <div>
                  <span className="content">{msg.content}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            this.props.postMessage(e, { content: this.state.content });
            this.setState({ content: "" });
          }}
          autoComplete="off"
        >
          <div className="row form-container-row valign-wrapper">
            <div className="col s9 input-field">
              <input
                type="text"
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
              />
            </div>

            <div className="col s3">
              <button
                className="waves-effect waves-light btn-floating cyan white-text ml-1"
                type="submit"
              >
                <InlineIcon icon={sendIcon} className="white-text" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SideChatBox);
