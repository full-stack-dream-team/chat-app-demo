import React from "react";
import M from "materialize-css";
import LoadingSplash from "../components/LoadingSplash";

import { Icon } from "@iconify/react";
import editIcon from "@iconify/icons-mdi/account-edit";
import homeIcon from "@iconify/icons-mdi/home";

import { connect } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import { editUser } from "../redux/actions/authActions";

class User extends React.Component {
  state = {
    name: "",
    email: "",
    description: "",

    demoDesc: "",
  };

  descBits = [
    [
      "I'd like to",
      "I think that I",
      "when the time comes I will",
      "great things happen when you",
      "in my lifetime we might",
    ],
    [
      "stroll by the beach with a",
      "buy a",
      "go to the mall looking for a",
      "see someone with a nice looking",
      "think of things to do with my",
    ],
    [
      "dog",
      "shoe",
      "hamster",
      "bag of candy",
      "friend",
      "little helper",
      "shirt",
      "coat",
      "poor hobo",
    ],
    ["begging for", "looking for", "wanting", "living for"],
    [
      "something to eat",
      "a person to talk to",
      "your accent",
      "a big fish",
      "lots of toys",
      "a pet",
    ],
  ];

  generateDesc = () => {
    const {
      otherUser: { name },
    } = this.props;

    const desc = `Hi, I'm ${name}. ${this.randDescBit(0)} ${this.randDescBit(
      1
    )} ${this.randDescBit(2)} while ${this.randDescBit(3)} ${this.randDescBit(
      4
    )}. Also, ${this.randDescBit(0)} ${this.randDescBit(1)} ${this.randDescBit(
      2
    )} while ${this.randDescBit(3)} ${this.randDescBit(
      4
    )}. And, ${this.randDescBit(0)} ${this.randDescBit(1)} ${this.randDescBit(
      2
    )} while ${this.randDescBit(3)} ${this.randDescBit(4)}.`;

    this.setState({ demoDesc: desc });
  };

  randDescBit = (index) => {
    const descBits = this.descBits[index];
    const randNum = Math.floor(Math.random() * descBits.length);
    const descBit = descBits[randNum];

    descBits.splice(randNum, 1);

    return descBit;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, description } = this.state;

    this.props.editUser({
      name,
      email,
      description,
      userId: this.props.user.id,
    });
  };

  componentDidMount() {
    this.props.getUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.otherUser._id &&
      prevProps.otherUser._id !== this.props.otherUser._id
    ) {
      this.generateDesc();

      if (this.props.user.id === this.props.otherUser._id) {
        const {
          otherUser: { name, email, description },
        } = this.props;

        M.Modal.init(this.Modal, {});

        this.setState({ name, email, description }, () => {
          M.updateTextFields();
          M.textareaAutoResize(this.Textarea);
        });

        const string =
          "I am an indie developer on the road making websites with Javascript/React/NodeJS, and css/scss. I am also a really cool guy 😎 who likes to fish, skip rocks, and play with Chloe and Ethan.";
      }
    }
  }

  render() {
    const { otherUser, user } = this.props;

    return otherUser._id ? (
      <>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="card blue-grey">
                <div className="card-content">
                  <span className="card-title">{otherUser.name}</span>

                  <div className="row">
                    <div className="col s5">
                      <div className="profile-image">
                        <img
                          src="https://www.gstatic.com/tv/thumb/persons/235135/235135_v9_ba.jpg"
                          alt="profile"
                          width="250px"
                        />
                      </div>
                    </div>

                    <div className="col s6 blue-grey lighten-1">
                      <div className="row">
                        <div className="col s12">
                          <h6>{otherUser.email}</h6>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col s12">
                          <h6>Curse word based ranking:</h6>
                          <input type="range" className="ranking-slider" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <h4 className="blue-grey lighten-1 desc-title">
                        Personal description
                      </h4>

                      <br />

                      <div className="blue-grey lighten-1  personal-desc">
                        <span className="flow-text">
                          {otherUser.description || this.state.demoDesc}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-action">
                  <a href="/" className="btn-flat">
                    <Icon icon={homeIcon} style={{ fontSize: "40px" }} />
                  </a>

                  {user.id === otherUser._id ? (
                    <a href="#edit-modal" className="btn-flat modal-trigger">
                      <Icon icon={editIcon} style={{ fontSize: "40px" }} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {user.id === otherUser._id ? (
          <div
            id="edit-modal"
            className="modal"
            ref={(Modal) => {
              this.Modal = Modal;
            }}
          >
            <div className="modal-content">
              <div className="row">
                <div className="col s12">
                  <h3>Edit</h3>
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <form
                    id="edit-user-form"
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                  >
                    <div className="row">
                      <div className="col s12 input-field">
                        <input
                          name="name"
                          type="text"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12 input-field">
                        <input
                          name="email"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12 input-field">
                        <textarea
                          name="description"
                          type="text"
                          value={this.state.description}
                          onChange={this.handleChange}
                          className="materialize-textarea"
                          ref={(Textarea) => {
                            this.Textarea = Textarea;
                          }}
                        />
                        <label htmlFor="description">
                          Personal Description
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                form="edit-user-form"
                className="modal-close btn-flat"
              >
                Submit
              </button>

              <button className="modal-close btn-flat">Cancel</button>
            </div>
          </div>
        ) : null}
      </>
    ) : (
      <LoadingSplash />
    );
  }
}

const mapStateToProps = (state) => ({
  otherUser: state.otherUser,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUser, editUser })(User);
