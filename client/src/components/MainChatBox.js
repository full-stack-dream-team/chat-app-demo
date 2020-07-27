import React from "react";
import M from "materialize-css";
import { connect } from "react-redux";

import MainToolBar from "./MainToolBar";
import timeAgo from "../helpers/formatDate";

class MainChatBox extends React.Component {
  state = {
    content: "",
    editing: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = (e, msg) => {
    this.setState({ editing: false });
    this.props.editPost(e, this.props.user.id, msg);
  };

  render() {
    const {
      makeChatBoxRef,
      chat,
      postMessage,
      user: { id },
      deletePost,
    } = this.props;

    return (
      <>
        <div className="row">
          <div className="col s12">
            <ul
              className="main-chat-box cyan lighten-3 z-depth-3"
              ref={makeChatBoxRef}
            >
              {chat.map((msg, i) => (
                <li
                  key={msg._id || i}
                  className={`main-chat-message pb-1 ${
                    msg.color ? msg.color + " lighten-3" : ""
                  }`}
                >
                  {(msg.userId === id ||
                    this.props.user.authorized === "ADMIN") &&
                  this.state.editing === msg._id ? (
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row mb-0">
                        <div className="col s12 input-field">
                          <textarea
                            name="content"
                            className="materialize-textarea mb-0"
                            cols="30"
                            rows="10"
                            onFocus={(e) => {
                              const txtElement = e.target;

                              if (txtElement.setSelectionRange) {
                                txtElement.focus();
                                txtElement.setSelectionRange(
                                  txtElement.value.length,
                                  txtElement.value.length
                                );
                              } else if (txtElement.createTextRange) {
                                var range = txtElement.createTextRange();
                                range.moveStart(
                                  "character",
                                  txtElement.value.length
                                );
                                range.select();
                              }

                              M.updateTextFields();
                              M.textareaAutoResize(txtElement);
                            }}
                            onBlur={(e) => this.handleBlur(e, msg)}
                            defaultValue={msg.content}
                            autoFocus
                          ></textarea>
                          <label htmlFor="content" className="black-text">
                            Edit Post
                          </label>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="row mb-0">
                        <div className="name col s6">
                          <h6 style={{ display: "inline-block" }}>
                            <strong>{msg.name}</strong>
                          </h6>

                          <span className="timestamp ml-1">
                            {msg.createdAt ? timeAgo(msg.createdAt) : null}
                          </span>
                        </div>

                        {(msg.userId === id ||
                          this.props.user.authorized === "ADMIN") &&
                        msg._id ? (
                          <div className="col s6 right-align btn-delete-container">
                            <span
                              className="btn-delete"
                              onClick={() => deletePost(id, msg)}
                            >
                              ✕
                            </span>
                          </div>
                        ) : null}
                      </div>

                      <div
                        className={`content row ${
                          msg.color || "cyan"
                        } lighten-4`}
                      >
                        <span
                          onClick={() => {
                            if (msg._id) {
                              this.setState({ editing: msg._id });
                            }
                          }}
                        >
                          {msg.content}
                        </span>

                        {msg.image ? (
                          <img src={msg.image} alt="can't find" />
                        ) : null}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <MainToolBar postMessage={postMessage} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(MainChatBox);
