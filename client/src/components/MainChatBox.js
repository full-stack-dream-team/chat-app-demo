import React from "react";

import { connect } from "react-redux";

class MainChatBox extends React.Component {
  state = {
    content: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col s12">
            <ul className="main-chat-box" ref={this.props.makeChatBoxRef}>
              {this.props.chat.map((msg, i) => (
                <li key={msg._id ? msg._id : i} className="main-chat-message">
                  <div className="row mb-0">
                    <div className="name col s6">
                      <span>{msg.name}</span>
                    </div>

                    {msg.userId === this.props.user.id ? (
                      <div className="col s6 right-align">
                        <button
                          className="btn-flat btn-delete"
                          onClick={() =>
                            this.props.deletePost(this.props.user.id, msg)
                          }
                        >
                          ✕
                        </button>
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

        <div className="row">
          <div className="col s12">
            <form
              onSubmit={(e) => this.props.postMessage(e, this.state.content)}
              autoComplete="off"
            >
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(MainChatBox);
