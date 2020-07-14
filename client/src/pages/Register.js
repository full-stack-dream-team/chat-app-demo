import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { registerUser } from "../redux/actions/authActions";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    const newUser = {
      name,
      email,
      password,
      password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h3>Register</h3>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col s12 input-field">
                  <input
                    onChange={this.handleChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name,
                    })}
                  />
                  <label htmlFor="name">Name</label>
                  <span className="helper-text" data-error={errors.name}></span>
                </div>
              </div>

              <div className="row">
                <div className="col s12 input-field">
                  <input
                    onChange={this.handleChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email,
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span
                    className="helper-text"
                    data-error={errors.email}
                  ></span>
                </div>
              </div>

              <div className="row">
                <div className="col s6 input-field">
                  <input
                    onChange={this.handleChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password,
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="helper-text"
                    data-error={errors.password}
                  ></span>
                </div>

                <div className="col s6 input-field">
                  <input
                    onChange={this.handleChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2,
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span
                    className="helper-text"
                    data-error={errors.password2}
                  ></span>
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <button type="submit" className="btn">
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <blockquote>
              Already have an account? <a href="/login">Log In</a>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
