import React from "react";
import M from "materialize-css";
import EmojiButton from "@joeattardi/emoji-button";
import PostColorPicker from "./PostColorPicker";
import EffectPicker from "./EffectPicker";
import UploadImage from "./UploadImage";

import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import stickerEmoji from "@iconify/icons-mdi/sticker-emoji";
import { connect } from "react-redux";

import { uploadImage } from "../redux/actions/chatActions";

class MainToolBar extends React.Component {
  state = {
    content: "",
    color: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    const { postMessage, sendEffect, imageUrl, imageAlt } = this.props;
    const { image, content, file, color } = this.state;

    return (
      <div className="row">
        <div
          className={`col s12 ${color || "cyan"} lighten-4 z-depth-5`}
          style={{ borderRadius: "10px" }}
        >
          <form
            onSubmit={(e) => {
              postMessage(e, {
                content,
                color,
              });

              this.setState(
                {
                  content: "",
                },
                () => M.textareaAutoResize(this.Textarea)
              );
            }}
            autoComplete="off"
          >
            <div className="row mb-0">
              <div className="col s12 mb-0 input-field">
                <textarea
                  name="content"
                  value={content}
                  className="materialize-textarea mb-0"
                  onChange={this.handleChange}
                  required
                  ref={(Textarea) => {
                    this.Textarea = Textarea;
                  }}
                />
                <label htmlFor="content">Message</label>
              </div>
            </div>

            <div className="row mb-0 valign-wrapper">
              <PostColorPicker color={color} handleChange={this.handleChange} />

              <div className="col s10 right-align">
                <EffectPicker sendEffect={sendEffect} />

                <span
                  className="btn-icon btn-flat hide-on-small-only"
                  style={{
                    fontSize: "30px",
                  }}
                  onClick={this.enableEmojiPicker}
                  ref={(EmojiActivator) => {
                    this.EmojiActivator = EmojiActivator;
                  }}
                >
                  <InlineIcon
                    icon={stickerEmoji}
                    className="deep-orange-text"
                  />
                </span>

                {/*<UploadImage imageUrl={imageUrl} imageAlt={imageAlt} />*/}

                <button
                  type="submit"
                  className="btn-icon btn-flat"
                  style={{
                    fontSize: "30px",
                  }}
                >
                  <InlineIcon icon={sendIcon} className="green-text accent-2" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(undefined, { uploadImage })(MainToolBar);
