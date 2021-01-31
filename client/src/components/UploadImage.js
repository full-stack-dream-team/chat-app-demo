import React from "react";
import { connect } from "react-redux";
import { InlineIcon } from "@iconify/react";
import fileImageOutline from "@iconify/icons-mdi/file-image-outline";

import { uploadImage } from "../redux/actions/chatActions";

class UploadImage extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
    publicId: null,
  };

  openWidget = (imageUrl, imageAlt, publicId) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "goodstuffing123",
        uploadPreset: "demo-upload-images",
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType: "image",
        clientAllowedFormats: ["png", "jpeg"],
        showUploadMoreButton: false,
        singleUploadAutoClose: true,
        theme: "purple",
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
          this.setState(
            {
              imageUrl: result.info.secure_url,
              imageAlt: result.info.original_filename,
              publicId: result.info.public_id,
            },
            () => {
              this.props.uploadImage(
                this.props.user,
                this.state.imageUrl,
                this.state.imageAlt,
                this.state.publicId,
                this.props.color,
                this.props.roomId
              );
            }
          );
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
