import React from "react";
import { connect } from "react-redux";
import { InlineIcon } from "@iconify/react";
import fileImageOutline from "@iconify/icons-mdi/file-image-outline";

import { uploadImage } from "../redux/actions/chatActions";

class UploadImage extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
  };

  openWidget = (imageUrl) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "goodstuffing123",
        uploadPreset: "chat-app-files",
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType: "image",
        clientAllowedFormats: ["png", "jpeg"],
        showUploadMoreButton: false,
        singleUploadAutoClose: true,
        text: {
          en: {
            local: {
              dd_title_single: "Drag and Drop your image here (jpg or png)",
            },
            queue: {
              abort_all: "cancel upload",
            },
            uploader: {
              errors: {
                allowed_formats: "jpeg or png files only!",
              },
            },
          },
        },
      },
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            imageUrl: result.info.secure_url,
            imageAlt: result.info.original_filename,
          });

          this.props.uploadImage(imageUrl);
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

export default connect(undefined, { uploadImage })(UploadImage);