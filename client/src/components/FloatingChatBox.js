import React from "react";
import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";

import { connect } from "react-redux";

class SideChatBox extends React.Component {
  state = {
    boxPosition: JSON.parse(localStorage.getItem("sideChatBox")) || {
      x: 0,
      y: 0,
      w: 330,
      h: 270,
    },
    minimized: false,
    content: "",
  };

  mouseOffset = { x: 0, y: 0 };
  dragging = false;
  resizing = false;

  handleDrag = (e) => {
    if (this.dragging) {
      this.setState({
        boxPosition: {
          ...this.state.boxPosition,
          x: e.x + this.mouseOffset.x,
          y: e.y + this.mouseOffset.y,
        },
      });
    } else if (this.resizing) {
      const boxPosition = {
        ...this.state.boxPosition,
        w: e.x - this.state.boxPosition.x + 8,
        h: e.y - this.state.boxPosition.y - 15,
      };

      if (boxPosition.w < 330) {
        boxPosition.w = 330;
      }
      if (boxPosition.h < 270) {
        boxPosition.h = 270;
      }

      this.setState({
        boxPosition,
      });
    }
  };

  handleMouseDown = (e) => {
    if (e.target.className === "resize-handle") {
      this.resizing = true;
    } else {
      this.dragging = true;

      const clientRect = e.target.getBoundingClientRect();
      this.mouseOffset = {
        x: clientRect.x - e.clientX,
        y: clientRect.y - e.clientY,
      };
    }
  };

  handleMouseUp = (e) => {
    const boxPosition = { ...this.state.boxPosition };
    if (this.resizing) {
      this.resizing = false;
    }

    if (this.dragging) {
      this.dragging = false;

      const boxRect = this.BoxContainer.getBoundingClientRect();

      if (boxPosition.x < 0) {
        boxPosition.x = 0;
      } else if (boxPosition.x + boxRect.width > window.innerWidth) {
        boxPosition.x = window.innerWidth - boxRect.width;
      }

      if (boxPosition.y < 0) {
        boxPosition.y = 0;
      } else if (boxPosition.y + boxRect.height > window.innerHeight) {
        boxPosition.y = window.innerHeight - boxRect.height;
      }

      this.setState({ boxPosition });
    }

    localStorage.setItem("sideChatBox", JSON.stringify(boxPosition));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.handleDrag);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleDrag);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    const { boxPosition } = this.state;

    return (
      <div
        className="side-chat-box z-depth-2"
        style={{
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
          width: `${boxPosition.w}px`,
        }}
        ref={(BoxContainer) => {
          this.BoxContainer = BoxContainer;
        }}
      >
        <ul className="moveable" onMouseDown={this.handleMouseDown}>
          <li
            className="minimize"
            onClick={() => this.setState({ minimized: !this.state.minimized })}
          >
            －
          </li>
        </ul>

        <div
          className="chat-area"
          style={{
            display: this.state.minimized ? "none" : "block",
            height: `${boxPosition.h}px`,
          }}
        >
          <div
            className="resize-handle"
            style={{
              left: `${boxPosition.w - 13}px`,
              top: `${boxPosition.h + 7}px`,
            }}
            onMouseDown={this.handleMouseDown}
          ></div>

          <div className="row chat-text-row">
            <div className="col s12 chat-text-col">
              <ul ref={this.props.makeChatBoxRef}>
                {this.props.chat.map((msg, i) => (
                  <li key={msg._id || i}>
                    <div className="row name-delete-container">
                      <div className="col s10 name-container">
                        <span className="name">{msg.name}</span>
                      </div>

                      {msg.userId === this.props.user.id ||
                      this.props.user.authorized === "ADMIN" ? (
                        <div className="col s2">
                          <span
                            className="delete"
                            onClick={() =>
                              this.props.deletePost(this.props.user.id, msg)
                            }
                          >
                            ✕
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="content-container">
                      <span>{msg.content}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form
            onSubmit={(e) => this.props.postMessage(e, this.state.content)}
            autoComplete="off"
          >
            <div className="row form-container-row valign-wrapper">
              <div className="col s12 input-field">
                <input
                  type="text"
                  name="content"
                  onChange={this.handleChange}
                />
                {"  "}

                <button
                  className="waves-effect waves-light btn-floating cyan white-text ml-1"
                  type="submit"
                >
                  <InlineIcon icon={sendIcon} className="white-text" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SideChatBox);
