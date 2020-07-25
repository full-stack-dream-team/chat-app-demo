import React from "react";
import { connect } from "react-redux";

import MainToolBar from "./MainToolBar";
import timeAgo from "../helpers/formatDate";

class MainChatBox extends React.Component {
  render() {
    const {
      makeChatBoxRef,
      chat,
      postMessage,
      user: { id },
      deletePost,
    } = this.props;

    return (
      <>
        <div className="row">
          <div className="col s12">
            <ul
              className="main-chat-box cyan lighten-3 z-depth-3"
              ref={makeChatBoxRef}
            >
              {chat.map((msg, i) => (
                <li
                  key={msg._id || i}
                  className={`main-chat-message pb-1 ${
                    msg.color ? msg.color + " lighten-3" : ""
                  }`}
                >
                  <div className="row mb-0">
                    <div className="name col s6">
                      <h6 style={{ display: "inline-block" }}>
                        <strong>{msg.name}</strong>
                      </h6>
                      <span className="timestamp ml-1">
                        {msg.createdAt ? timeAgo(msg.createdAt) : null}
                      </span>
                    </div>

                    {(msg.userId === id ||
                      this.props.user.authorized === "ADMIN") &&
                    msg._id ? (
                      <div className="col s6 right-align btn-delete-container">
                        <span
                          className="btn-delete"
                          onClick={() => deletePost(id, msg)}
                        >
                          ✕
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={`content row ${msg.color || "cyan"} lighten-4`}
                  >
                    <span>{msg.content}</span>

                    {msg.image ? (
                      <img src={msg.image} alt="can't find" />
                    ) : null}
                  </div>

                  {msg.image ? <img src={msg.image} alt="none" /> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <MainToolBar postMessage={postMessage} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(MainChatBox);
