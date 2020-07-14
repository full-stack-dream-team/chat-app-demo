import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { resetUserPassword } from "../redux/actions/authActions";

class ResetPassword extends React.Component {
  state = {
    password: "",
    password2: "",
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { password, password2 } = this.state;

    const data = {
      password,
      password2,
      token: this.props.match.params.token,
    };

    this.props.resetUserPassword(data, this.props.history);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      if (this.props.errors.token === "invalid") {
        this.props.history.push("/oops");
      }
      this.setState({ errors: this.props.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h3>Type new password</h3>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col s12 input-field">
                  <input
                    onChange={this.handleChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect,
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="helper-text"
                    data-error={errors.password || errors.passwordincorrect}
                  ></span>
                </div>
              </div>

              <div className="row">
                <div className="col s12 input-field">
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
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <blockquote>
              Suddenly remember password? <a href="/login">Log In</a>
              <br />
              Want to make a new account? <a href="/register">Register</a>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetUserPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { resetUserPassword })(ResetPassword);
