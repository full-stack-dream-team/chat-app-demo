import React from "react";
import M from "materialize-css";
import LoadingSplash from "../components/LoadingSplash";
import Nav from "../components/Navbar";

import { Icon } from "@iconify/react";
import deleteIcon from "@iconify/icons-mdi/delete";

import { connect } from "react-redux";
import {
  getChatRooms,
  addChatRoom,
  deleteChatRoom,
} from "../redux/actions/chatRoomActions";

class ChatRooms extends React.Component {
  state = {
    title: "",
    blackOrWhite: "none",
    list: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addChatRoom({
      title: this.state.title,
      ownerId: this.props.user.id,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editList = (e, i) => {
    const list = [...this.state.list];
    list[i] = e.target.value;

    this.setState({ list });
  };

  componentDidMount() {
    this.props.getChatRooms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chatRoomsLoading && !this.props.chatRoomsLoading) {
      M.Modal.init(this.Modal, {});
    }
  }

  render() {
    const { chatRooms } = this.props;

    return this.props.chatRoomsLoading ? (
      <LoadingSplash />
    ) : (
      <>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h2>Chat Rooms</h2>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <button className="btn modal-trigger" data-target="add-chat-room">
                Add Chat Room
              </button>

              <ul className="collection with-header">
                <li className="collection-header">
                  <h4>Pick a room</h4>
                </li>

                {chatRooms.length ? (
                  chatRooms.map((chatRoom) => (
                    <li key={chatRoom._id} className="collection-item">
                      <div>
                        <a href={`/chatrooms/${chatRoom._id}`}>
                          {chatRoom.title}
                        </a>

                        {chatRoom.ownerId === this.props.user.id ||
                        this.props.user.authorized === "ADMIN" ? (
                          <button
                            className="btn-flat secondary-content"
                            onClick={() =>
                              this.props.deleteChatRoom(chatRoom._id)
                            }
                          >
                            <Icon
                              icon={deleteIcon}
                              style={{ fontSize: "24px" }}
                            />
                          </button>
                        ) : null}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="collection-item center">
                    No chat rooms found!
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div
          id="add-chat-room"
          className="modal"
          ref={(Modal) => {
            this.Modal = Modal;
          }}
        >
          <div className="modal-content">
            <h4>Add a Chat Room</h4>

            <div className="row">
              <div className="col s12">
                <form
                  id="add-chat-room-form"
                  onSubmit={this.handleSubmit}
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="col s12 input-field">
                      <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                  </div>

                  {/*<div className="row">
                    <div className="col s12">
                      <p>
                        <label>
                          <input
                            type="radio"
                            name="blackOrWhite"
                            value="black"
                            checked={
                              this.state.blackOrWhite === "black" ? true : false
                            }
                            onChange={this.handleChange}
                          />
                          <span>Blacklist</span>
                        </label>
                      </p>
                    </div>

                    <div className="col s12">
                      <p>
                        <label>
                          <input
                            type="radio"
                            name="blackOrWhite"
                            value="white"
                            checked={
                              this.state.blackOrWhite === "white" ? true : false
                            }
                            onChange={this.handleChange}
                          />
                          <span>Whitelist</span>
                        </label>
                      </p>
                    </div>

                    <div className="col s12">
                      <p>
                        <label>
                          <input
                            type="radio"
                            name="blackOrWhite"
                            value="none"
                            checked={
                              this.state.blackOrWhite === "none" ? true : false
                            }
                            onChange={this.handleChange}
                          />
                          <span>None</span>
                        </label>
                      </p>
                    </div>

                    {this.state.blackOrWhite !== "none" ? (
                      <>
                        <ul className="collection">
                          {this.state.list.map((user, i) => (
                            <li key={i} className="collection-item">
                              <input
                                type="text"
                                value={user}
                                onChange={(e) => this.editList(e, i)}
                                placeholder="Type a username or email, eg. john@doe.com, John Doe"
                                style={{ width: "80%" }}
                              />

                              <button
                                className="btn-flat"
                                style={{ fontSize: "24px", width: "20%" }}
                              >
                                <Icon icon={deleteIcon} />
                              </button>
                            </li>
                          ))}
                        </ul>

                        <div className="col s12 input-field">
                          <span
                            className="btn-small"
                            onClick={() =>
                              this.setState({ list: [...this.state.list, ""] })
                            }
                          >
                            Add to {this.state.blackOrWhite}list
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>*/}
                </form>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="submit"
              form="add-chat-room-form"
              className="modal-close btn-flat"
            >
              Add Room
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chatRooms: state.chatRoom.rooms,
  chatRoomsLoading: state.chatRoom.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getChatRooms,
  addChatRoom,
  deleteChatRoom,
})(ChatRooms);
