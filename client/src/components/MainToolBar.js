import React from "react";
import M from "materialize-css";
import EmojiButton from "@joeattardi/emoji-button";
import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import stickerEmoji from "@iconify/icons-mdi/sticker-emoji";
import cloudUploadOutline from "@iconify/icons-mdi/cloud-upload-outline";

class MainToolBar extends React.Component {
  state = {
    content: "",
    files: null,
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

  handleUpload = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    this.setState({ files: e.target.files[0] });
    this.props.uploadFiles({ ...this.state.files });

    // TODO: create an image preview before or while sending image(s) to the backend.
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = (e) => this.setState({ previewUrl: reader.result });
    // console.log(reader.result);
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

    return (
      <div className="row">
        <div className="col s12">
          <form
            onSubmit={(e) => postMessage(e, this.state.content)}
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
                <img
                  src={this.state.files}
                  width="100px"
                  alt=""
                  style={{ display: "none" }}
                />
              </div>

              <div className="col s12 light-blue lighten-5 py-2 right-align">
                <span
                  className="btn-icon btn-flat"
                  style={{
                    fontSize: "24px",
                    padding: "1px 6px",
                  }}
                >
                  <div id="file-upload" className="file-field input-field">
                    <div
                      className="btn-icon"
                      style={{
                        fontSize: "24px",
                        padding: "1px 6px",
                      }}
                    >
                      <InlineIcon
                        icon={cloudUploadOutline}
                        className="purple-text accent-2"
                      />
                      <input
                        type="file"
                        name="file"
                        multiple
                        style={{ visibility: "invisible" }}
                        onChange={this.handleUpload}
                      />
                    </div>
                  </div>
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

export default MainToolBar;
