import React from "react";
import M from "materialize-css";
import EmojiButton from "@joeattardi/emoji-button";
import PostColorPicker from "./PostColorPicker";
import EffectPicker from "./EffectPicker";
import UploadImage from "./UploadImage";

import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import stickerEmoji from "@iconify/icons-mdi/sticker-emoji";
import partyIcon from "@iconify/icons-mdi/party-popper";

import { connect } from "react-redux";

import { sendPost, sendEffect } from "../redux/actions/chatActions";

class MainToolBar extends React.Component {
  state = {
    content: "",
    color: localStorage.getItem("postColor") || ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setPostColor = color => {
    localStorage.setItem("postColor", color);
    this.setState({ color });
  };

  enableEmojiPicker = () => {
    this.picker.togglePicker(this.EmojiActivator);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { content, color } = this.state;

    this.props.sendPost(
      {
        content,
        color,
        userId: this.props.userId,
        roomId: this.props.roomId
      },
      this.props.user
    );

    this.setState(
      {
        content: ""
      },
      () => {
        M.updateTextFields();
        M.textareaAutoResize(this.Textarea);
      }
    );
  };

  componentDidMount() {
    this.picker = new EmojiButton();
    this.picker.on("emoji", emoji => {
      this.setState({ content: this.state.content + emoji }, () => {
        M.updateTextFields();
      });
    });
  }

  render() {
    const { sendEffect, imageUrl, imageAlt, publicId, user } = this.props;
    const { content, color } = this.state;

    return (
      <>
        <div className="row">
          <div
            className={`col s12 ${color || "cyan"} lighten-4 z-depth-5`}
            style={{ borderRadius: "10px" }}
          >
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div className="row mb-0">
                <div className="col s12 mb-0 input-field">
                  <textarea
                    name="content"
                    value={content}
                    className="materialize-textarea mb-0"
                    onChange={this.handleChange}
                    required
                    ref={Textarea => {
                      this.Textarea = Textarea;
                    }}
                  />
                  <label htmlFor="content">Message</label>
                </div>
              </div>

              <div className="row mb-0 valign-wrapper">
                <PostColorPicker
                  color={color}
                  handleChange={this.setPostColor}
                />

                <div className="col s10 right-align">
                  <span
                    data-target="effect-modal"
                    className="btn-icon btn-flat modal-trigger"
                    style={{
                      fontSize: "30px"
                    }}
                  >
                    <InlineIcon
                      icon={partyIcon}
                      className="brown-text text-lighten-1"
                    />
                  </span>

                  <span
                    className="btn-icon btn-flat hide-on-small-only"
                    style={{
                      fontSize: "30px"
                    }}
                    onClick={this.enableEmojiPicker}
                    ref={EmojiActivator => {
                      this.EmojiActivator = EmojiActivator;
                    }}
                  >
                    <InlineIcon
                      icon={stickerEmoji}
                      className="deep-orange-text"
                    />
                  </span>

                  <UploadImage
                    imageUrl={imageUrl}
                    imageAlt={imageAlt}
                    publicId={publicId}
                    user={user}
                    color={color}
                    roomId={this.props.roomId}
                  />

                  <button
                    type="submit"
                    className="btn-icon btn-flat"
                    style={{
                      fontSize: "30px"
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
        <EffectPicker sendEffect={sendEffect} />
      </>
    );
  }
}

export default connect(undefined, { sendPost, sendEffect })(MainToolBar);
