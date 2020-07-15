import React from "react";

import config from "../config";
import io from "socket.io-client";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

class App extends React.Component {
  state = {
    chat: [],
    content: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.socket.emit("message", {
      name: this.props.name,
      content: this.state.content,
    });

    this.setState(
      (state) => ({
        chat: [
          ...state.chat,
          { name: this.props.name, content: state.content },
        ],
        content: "",
      }),
      this.scrollToBottom
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
        this.scrollToBottom
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
          <div className="col s12 mt-2">
            <button className="btn" onClick={this.props.logoutUser}>
              Log Out
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <h1>Chat Here</h1>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <ul
              style={{ overflowY: "scroll" }}
              ref={(ChatBox) => {
                this.ChatBox = ChatBox;
              }}
            >
              {this.state.chat.map((msg, i) => (
                <li key={msg._id ? msg._id : i} style={{ overflowX: "scroll" }}>
                  {msg.name}: {msg.content}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col s12 input-field">
                  <input
                    type="text"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="content">Content</label>
                </div>
              </div>

              <div className="row">
                <div className="col s12">
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
  name: state.auth.user.name,
});

export default connect(mapStateToProps, { logoutUser })(App);
