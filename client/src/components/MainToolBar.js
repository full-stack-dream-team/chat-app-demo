import React from "react";
import M from "materialize-css";
import EmojiButton from "@joeattardi/emoji-button";
import PostColorPicker from "./PostColorPicker";
import { Icon, InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import stickerEmoji from "@iconify/icons-mdi/sticker-emoji";
import alphaXCircle from "@iconify/icons-mdi/alpha-x-circle";
import { connect } from "react-redux";

import { uploadImage } from "../redux/actions/chatActions";

class MainToolBar extends React.Component {
  state = {
    content: "",
    image: null,
    file: "",
    color: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  enableEmojiPicker = () => {
    this.picker.togglePicker(this.EmojiActivator);
  };

  compressImage = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = (e) => {
          const element = document.createElement("canvas");
          const ctx = element.getContext("2d");
          const width = 100;
          const scale = width / img.width;

          element.width = width;
          element.height = img.height * scale;

          ctx.drawImage(img, 0, 0, width, img.height * scale);
          const url = ctx.canvas.toDataURL(img);

          this.setState({ file, image: url });
        };
      };
    }
  };

  cancelImage = () => {
    this.setState({ image: null, file: null });
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
    const { postMessage } = this.props;
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
                image,
                file,
                color,
              });

              this.setState(
                {
                  content: "",
                  image: null,
                  file: "",
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
                {image ? (
                  <div
                    className="mt-1"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img src={image} width="150px" alt="Not found" />
                    <Icon
                      id="cancel-button"
                      icon={alphaXCircle}
                      onClick={this.cancelImage}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="row mb-0">
              <PostColorPicker color={color} handleChange={this.handleChange} />

              <div
                className="col s6 py-2 mt-1 right-align"
                style={{ marginLeft: "-10px" }}
              >
                {/*<span
                  className="btn-flat"
                  style={{
                    fontSize: "24px",
                    padding: "1px 6px",
                  }}
                >
                  <div id="file-upload" className="file-field input-field">
                    <InlineIcon
                      icon={fileImageOutline}
                      className="purple-text text-lighten-1"
                    />

                    <input
                      type="file"
                      name="file"
                      accept="image/jpeg, image/png"
                      style={{ visibility: "invisible" }}
                      onChange={this.compressImage}
                    />
                  </div>
                </span>*/}

                <span
                  className="btn-icon btn-flat mr-2 hide-on-small-only"
                  style={{
                    fontSize: "40px",
                    padding: "1px 6px",
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
                <button
                  type="submit"
                  className="btn-icon btn-flat"
                  style={{
                    fontSize: "40px",
                    padding: "1px 6px",
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
