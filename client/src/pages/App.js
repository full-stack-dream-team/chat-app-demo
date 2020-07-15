import React from "react";
import M from "materialize-css";

import config from "../config";
import io from "socket.io-client";

import { connect } from "react-redux";

import removeBadWords from "../helpers/removeBadWords";

class App extends React.Component {
  state = {
    chat: [],
    content: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const filteredContent = removeBadWords(this.state.content);

    this.socket.emit("message", {
      name: this.props.user.name,
      content: filteredContent,
      userId: this.props.user.id,
    });

    this.setState(
      (state) => ({
        chat: [
          ...state.chat,
          {
            name: this.props.user.name,
            content: filteredContent,
            userId: this.props.user.id,
          },
        ],
        content: "",
      }),
      () => {
        this.scrollToBottom();

        M.updateTextFields();
      }
    );
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  scrollToBottom = () => {
    this.ChatBox.scrollTop = this.ChatBox.scrollHeight;
  };

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    this.socket.on("init", (msg) => {
      this.setState({ chat: msg.reverse() }, this.scrollToBottom);
    });

    this.socket.on("push", (msg) => {
      this.setState(
        (state) => ({ chat: [...state.chat, msg] }),
        () => {
          this.scrollToBottom();

          const chatLimit = 50;
          if (this.state.chat.length > chatLimit) {
            const chat = [...this.state.chat];
            chat.slice(this.state.chat.length - chatLimit);
            this.setState({ chat });
          }
        }
      );
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <ul
              className="main-chat-box"
              ref={(ChatBox) => {
                this.ChatBox = ChatBox;
              }}
            >
              {this.state.chat.map((msg, i) => (
                <li key={msg._id ? msg._id : i} className="main-chat-message">
                  <div className="name">
                    <span>{msg.name}</span>
                  </div>

                  <div className="content">
                    {(() => {
                      const splitMsg = msg.content.split("\n");

                      return splitMsg.map((msgBit, i) => (
                        <div key={i}>
                          <span>{msgBit}</span>
                          {i < splitMsg.length - 1 ? <br /> : null}
                        </div>
                      ));
                    })()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col s8 m9 l10 input-field">
                  <textarea
                    name="content"
                    value={this.state.content}
                    className="materialize-textarea"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="content">Message</label>
                </div>

                <div className="col s4 m3 l2">
                  <button type="submit" className="btn">
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
