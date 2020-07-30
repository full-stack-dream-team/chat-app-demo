import React from "react";
import { InlineIcon } from "@iconify/react";
import fileImageOutline from "@iconify/icons-mdi/file-image-outline";

class UploadImage extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
  };

  openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "goodstuffing123",
        uploadPreset: "chat-app-files",
      },
      (error, result) => {
        if (result.event === "success") {
          this.setState({
            imageUrl: result.info.secure_url,
            imageAlt: result.info.original_filename,
          });
        }
      }
    );

    widget.open();
  };

  render() {
    return (
      <span
        className="btn-flat image-upload"
        style={{
          fontSize: "30px",
          padding: "1px 6px",
        }}
        onClick={this.openWidget}
      >
        <InlineIcon
          icon={fileImageOutline}
          className="purple-text text-lighten-1"
        />
      </span>
    );
  }
}

export default UploadImage;
