import React from "react";
import M from "materialize-css";
import Router from "./Router";

import config from "./config";
import io from "socket.io-client";

import { connect } from "react-redux";

import removeBadWords from "./helpers/removeBadWords";

class ChatFunc extends React.Component {
  state = {
    chat: [],
    chattingUsers: [],
  };

  handleSubmit = (e, content) => {
    e.preventDefault();

    const filteredContent = removeBadWords(content);

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
      }),
      () => {
        this.scrollToBottom();

        M.updateTextFields();
      }
    );
  };

  scrollToBottom = () => {
    this.ChatBox.scrollTop = this.ChatBox.scrollHeight;
  };

  makeChatBoxRef = (ChatBox) => {
    this.ChatBox = ChatBox;
  };

  deletePost = (userId, post) => {
    if (userId === post.userId) {
      if (window.confirm("Are you sure you want to delete this post?")) {
        this.socket.emit("delete", {
          postId: post._id,
        });
      } else {
        M.toast({ html: "Whew, that was close...", classes: "blue" });
      }
    } else {
      M.toast({ html: "That post does not belong to you!", classes: "red" });
    }
  };

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    this.socket.on("init", (msg) => {
      this.setState({ chat: msg.reverse() }, this.scrollToBottom);

      // this.socket.emit("addUser", {
      //   userId: this.props.user.id,
      // });
    });

    this.socket.on("push", (msg) => {
      this.setState(
        (state) => ({ chat: [...state.chat, msg] }),
        () => {
          this.scrollToBottom();

          const chatLimit = 100;
          if (this.state.chat.length > chatLimit) {
            const chat = [...this.state.chat];
            chat.slice(this.state.chat.length - chatLimit);
            this.setState({ chat });
          }
        }
      );
    });

    // this.socket.on("users", (users) => {
    //   if (!users.find((user) => user._id === this.props.user.id)) {
    //     this.setState({ chattingUsers: [...users, this.props.user] });
    //   }
    // });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <Router
        postMessage={this.handleSubmit}
        deletePost={this.deletePost}
        makeChatBoxRef={this.makeChatBoxRef}
        chat={this.state.chat}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ChatFunc);
