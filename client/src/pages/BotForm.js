import React from "react";
import noBotNotice from "../images/noBotNotice.png";

class BotForm extends React.Component {
  state = {
    inputs: [`input${Math.floor(Math.random() * 100000000000000000000000000)}`],
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      inputs: [
        `input${Math.floor(Math.random() * 100000000000000000000000000)}`,
      ],
    });
  };

  handleChange = () => {
    this.setState({
      inputs: [
        ...this.state.inputs,
        `input${Math.floor(Math.random() * 100000000000000000000000000)}`,
      ],
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <img src={noBotNotice} alt="No Bot Notice" />
          </div>
        </div>

        <form onSubmit={this.handleSubmit} autoComplete="off">
          {this.state.inputs.map((input, i) => (
            <div key={i} className="row">
              <div className="col s12 input-field">
                <input
                  type="text"
                  id={input}
                  name="name"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor={"#" + input}>{input}</label>
              </div>
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default BotForm;
