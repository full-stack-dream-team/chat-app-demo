import React from "react";
import { InlineIcon } from "@iconify/react";
import sendIcon from "@iconify/icons-mdi/send";
import M from "materialize-css";

import { connect } from "react-redux";
import { sendPost, startSocket } from "../redux/actions/chatActions";

class SideChatBox extends React.Component {
  state = {
    content: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.sendPost(
      {
        content: this.state.content,
      },
      this.props.user
    );

    this.setState({ content: "" });
  };

  componentDidMount() {
    this.props.startSocket();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chat.posts.length < this.props.chat.posts.length) {
      this.ChatBox.scrollTop = this.ChatBox.scrollHeight;
    }
  }

  render() {
    return (
      <>
        <div className="side-chat-box z-depth-2 col s3 l2">
          <div
            className="chat-area"
            ref={(ChatBox) => {
              this.ChatBox = ChatBox;
            }}
          >
            <ul>
              {this.props.chat.posts.map((msg, i) => (
                <li key={msg._id || i}>
                  <div>
                    <span className="name">{msg.name}</span>
                  </div>

                  <div>
                    <span className="content">{msg.content}</span>

                    {msg.imageUrl ? (
                      <img
                        src={msg.imageUrl}
                        alt={msg.imageAlt}
                        height="200"
                        ref={(Materialbox) => {
                          this.Materialbox = Materialbox;
                        }}
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="row mb-0">
              <div className="col s8 input-field">
                <input
                  type="text"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="col s2">
                <button className="btn-floating cyan white-text" type="submit">
                  <InlineIcon icon={sendIcon} className="white-text" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  chat: state.chat,
});

export default connect(mapStateToProps, { sendPost, startSocket })(SideChatBox);
