import React from "react";
import M from "materialize-css";
import EmojiButton from "@joeattardi/emoji-button";
import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import stickerEmoji from "@iconify/icons-mdi/sticker-emoji";
import cloudUploadOutline from "@iconify/icons-mdi/cloud-upload-outline";

import { connect } from "react-redux";

class MainChatBox extends React.Component {
  state = {
    content: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = (e) => {
    this.setState({ [e.target.name]: e.target.value.trim() });
  };

  enableEmojiPicker = () => {
    this.picker.togglePicker(this.EmojiActivator);
  };

  componentDidMount() {
    this.picker = new EmojiButton();
    this.picker.on("emoji", (emoji) => {
      this.setState({ content: this.state.content + emoji }, () => {
        M.updateTextFields();
      });
    });
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col s12">
            <ul className="main-chat-box" ref={this.props.makeChatBoxRef}>
              {this.props.chat.map((msg, i) => (
                <li key={msg._id || i} className="main-chat-message">
                  <div className="row mb-0">
                    <div className="name col s6">
                      <span>{msg.name}</span>
                    </div>

                    {msg.userId === this.props.user.id ? (
                      <div className="col s6 right-align btn-delete-container">
                        <span
                          className="btn-delete"
                          onClick={() =>
                            this.props.deletePost(this.props.user.id, msg)
                          }
                        >
                          ✕
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="content row">
                    {(() => {
                      const splitMsg = msg.content.split("\n");

                      return splitMsg.map((msgBit, i) => (
                        <div className="col s12" key={i}>
                          <span>{msgBit}</span>
                        </div>
                      ));
                    })()}
                  </div>

                  <div className="timestamp row">
                    <div className="col s12 right-align">
                      <span>{msg.createdAt ? msg.createdAt : null}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <form
              onSubmit={(e) => this.props.postMessage(e, this.state.content)}
              autoComplete="off"
            >
              <div className="row">
                <div className="col s12 light-blue lighten-5 mb-0 input-field">
                  <textarea
                    name="content"
                    value={this.state.content}
                    className="materialize-textarea mb-0"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    required
                    ref={(Textarea) => {
                      this.Textarea = Textarea;
                    }}
                  />
                  <label htmlFor="content">Message</label>
                </div>

                <div className="col s12 light-blue lighten-5 py-2 right-align">
                  <span
                    className="btn-icon btn-flat"
                    style={{
                      fontSize: "24px",
                      padding: "1px 6px",
                    }}
                  >
                    <InlineIcon
                      icon={cloudUploadOutline}
                      className="purple-text accent-2"
                    />
                  </span>
                  <span
                    className="btn-icon btn-flat mr-2"
                    style={{
                      fontSize: "24px",
                      padding: "1px 6px",
                    }}
                    onClick={this.enableEmojiPicker}
                    ref={(EmojiActivator) => {
                      this.EmojiActivator = EmojiActivator;
                    }}
                  >
                    <InlineIcon
                      icon={stickerEmoji}
                      className="orange-text accent-2"
                    />
                  </span>
                  <button
                    type="submit"
                    className="btn-icon btn-flat"
                    style={{
                      fontSize: "24px",
                      padding: "1px 6px",
                    }}
                  >
                    <InlineIcon
                      icon={sendIcon}
                      className="green-text accent-2"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(MainChatBox);
