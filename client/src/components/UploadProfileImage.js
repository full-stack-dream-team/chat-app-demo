import React from "react";
import { connect } from "react-redux";
import { InlineIcon } from "@iconify/react";
import leadPencil from "@iconify/icons-mdi/lead-pencil";

import { uploadProfileImage } from "../redux/actions/userActions";

class UploadProfileImage extends React.Component {
  state = {
    image: null,
  };

  openWidget = (image) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "goodstuffing123",
        uploadPreset: "ogaxpreg",
        sources: ["local", "camera"],
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
          this.setState({ image: result.info }, () => {
            this.props.uploadProfileImage(this.props.user, this.state.image);
          });
        }
      }
    );

    widget.open();
  };

  render() {
    return (
      <button
        className="btn waves-effect waves-light red center-align mt-1"
        onClick={this.openWidget}
      >
        <InlineIcon
          icon={leadPencil}
          className="mr-1"
          style={{
            fontSize: "24px",
            display: "inlineFlex",
            verticalAlign: "inherit",
          }}
        />
        Upload Profile Image
      </button>
    );
  }
}

export default connect(undefined, { uploadProfileImage })(UploadProfileImage);
