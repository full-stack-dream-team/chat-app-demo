import React from "react";

import { connect } from "react-redux";

import MainToolBar from "./MainToolBar";

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
            <ul className="main-chat-box" ref={makeChatBoxRef}>
              {chat.map((msg, i) => (
                <li key={msg._id || i} className="main-chat-message">
                  <div className="row mb-0">
                    <div className="name col s6">
                      <span>{msg.name}</span>
                    </div>

                    {msg.userId === id ||
                    this.props.user.authorized === "ADMIN" ? (
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

                  <div className="content row">
                    {(() => {
                      const splitMsg = msg.content.split("\n");

                      return splitMsg.map((msgBit, i) => (
                        <div className="col s12" key={i}>
                          <span>{msgBit}</span>
                        </div>
                      ));
                    })()}

                    {msg.image ? (
                      <img src={msg.image} alt="can't find" />
                    ) : null}
                  </div>

                  <div className="timestamp row">
                    <div className="col s12 right-align">
                      <span>{msg.createdAt ? msg.createdAt : null}</span>
                    </div>
                  </div>
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
