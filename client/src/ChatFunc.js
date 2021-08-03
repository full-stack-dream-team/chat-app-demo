import React from "react";
import M from "materialize-css";
import Router from "./Router";
import { connect } from "react-redux";
import io from "socket.io-client";

import config from "./config";
import { uploadImage, setPostsLoading } from "./redux/actions/chatActions";

import postNotify from "./audio/post-notify.mp3";

class ChatFunc extends React.Component {
  state = {
    chat: [],
    chattingUsers: [],
    effect: null
  };

  sendEffect = effect => {
    this.socket.emit("effect", effect);
    this.setState({ effect }, () => this.setState({ effect: null }));
  };

  handleSubmit = (e, post) => {
    e.preventDefault();

    this.socket.emit("message", {
      name: this.props.user.name,
      content: post.content,
      userId: this.props.user.id,
      userAuthorized: this.props.user.authorized,
      color: post.color
    });

    this.setState(
      state => ({
        chat: [
          ...state.chat,
          {
            name: this.props.user.name,
            content: post.content,
            userId: this.props.user.id,
            userAuthorized: this.props.user.authorized,
            color: post.color
          }
        ]
      }),
      () => {
        this.scrollToBottom();

        M.updateTextFields();
      }
    );

    // this.props.uploadImage(image);
  };

  scrollToBottom = () => {
    this.ChatBox.scrollTop = this.ChatBox.scrollHeight;
  };

  makeChatBoxRef = ChatBox => {
    this.ChatBox = ChatBox;
  };

  editPost = (e, userId, post) => {
    if (userId === post.userId || this.props.user.authorized === "ADMIN") {
      this.socket.emit("edit", {
        name: this.props.user.name,
        content: e.target.value,
        userId: this.props.user.id,
        userAuthorized: this.props.user.authorized,
        color: post.color,
        _id: post._id
      });

      const chat = [...this.state.chat];
      const postIndex = chat.findIndex(msg => msg._id === post._id);

      chat[postIndex].content = e.target.value;

      this.setState(state => ({
        chat
      }));
    }
  };

  deletePost = (userId, post) => {
    if (userId === post.userId || this.props.user.authorized === "ADMIN") {
      if (window.confirm("Are you sure you want to delete this post?")) {
        const newChat = [...this.state.chat];
        newChat.splice(
          newChat.findIndex(msg => post._id === msg._id),
          1
        );
        this.setState({
          chat: newChat
        });

        this.socket.emit("delete", {
          postId: post._id
        });
      } else {
        M.toast({ html: "Whew, that was close...", classes: "blue" });
      }
    } else {
      M.toast({ html: "That post does not belong to you!", classes: "red" });
    }
  };

  componentDidMount() {
    if (this.props.isAuthenticated && this.ChatBox) {
      if (window.Notification) {
        Notification.requestPermission();
      }

      this.socket = io(config[process.env.NODE_ENV].endpoint);

      this.socket.on("init", msg => {
        this.setState({ chat: msg.reverse() }, () => {
          this.scrollToBottom();
          this.props.setPostsLoading(false);
        });
        // this.socket.emit("addUser", {
        //   userId: this.props.user.id,
        // });
      });

      this.socket.on("push", msg => {
        if (window.Notification) {
          new Notification(msg.content);
        }

        this.Audio.play();

        this.setState(
          state => ({ chat: [...state.chat, msg] }),
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

      this.socket.on("remove", postId => {
        const newChat = [...this.state.chat];
        newChat.splice(
          newChat.findIndex(msg => postId === msg._id),
          1
        );
        this.setState({
          chat: newChat
        });
      });

      this.socket.on("edited", msg => {
        const chat = [...this.state.chat];
        const postIndex = chat.findIndex(stateMsg => msg._id === stateMsg._id);

        chat[postIndex].content = msg.content;

        this.setState(state => ({
          chat
        }));
      });

      this.socket.on("effect", effect => {
        this.setState({ effect }, () => this.setState({ effect: null }));
      });

      // this.socket.on("users", (users) => {
      //   if (!users.find((user) => user._id === this.props.user.id)) {
      //     this.setState({ chattingUsers: [...users, this.props.user] });
      //   }
      // });}
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return this.props.isAuthenticated ? (
      <>
        <Router
          postMessage={this.handleSubmit}
          deletePost={this.deletePost}
          editPost={this.editPost}
          makeChatBoxRef={this.makeChatBoxRef}
          chat={this.state.chat}
          effect={this.state.effect}
          sendEffect={this.sendEffect}
        />

        <audio
          src={postNotify}
          ref={Audio => {
            this.Audio = Audio;
          }}
        ></audio>
      </>
    ) : (
      <Router />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  postsLoading: state.chat.postsLoading
});

export default connect(mapStateToProps, { uploadImage, setPostsLoading })(
  ChatFunc
);
