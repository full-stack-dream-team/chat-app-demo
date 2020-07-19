import React from "react";
import M from "materialize-css";
import EmojiButton from "@joeattardi/emoji-button";
import { Icon, InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import stickerEmoji from "@iconify/icons-mdi/sticker-emoji";
import fileImageOutline from "@iconify/icons-mdi/file-image-outline";
import alphaXCircle from "@iconify/icons-mdi/alpha-x-circle";

class MainToolBar extends React.Component {
  state = {
    content: "",
    imagePreviewUrl: null,
    file: "",
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

  showPreview = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    // Create image previews
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  cancelImage = () => {
    this.setState({ imagePreviewUrl: null, file: "" });
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
    const { imagePreviewUrl } = this.state;

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
                {imagePreviewUrl ? (
                  <div
                    className="mt-1"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img src={imagePreviewUrl} width="150px" alt="" />
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
                        icon={fileImageOutline}
                        className="purple-text accent-2"
                      />
                      <input
                        type="file"
                        name="file"
                        accept="image/jpeg, image/png, image/gif"
                        multiple
                        style={{ visibility: "invisible" }}
                        onChange={this.showPreview}
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
