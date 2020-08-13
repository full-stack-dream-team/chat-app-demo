import React from "react";

class EffectMaker extends React.Component {
  state = {
    shape: "circle",

    color: "#000000",
    randomColor: false,

    size: 5,
    randomSize: false,

    x: 0,
    randomX: false,

    y: 0,
    randomY: false,

    amount: 100,

    speedX: 0,
    randomSpeedX: false,

    speedY: 0,
    randomSpeedY: false,

    speedSize: 0,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.sendEffect(this.state);
  };

  handleChange = (e) => {
    if (e.target.type === "number") {
      if (!parseFloat(e.target.value) && parseFloat(e.target.value) !== 0) {
        if (e.target.value.includes("-")) {
          this.setState({ [e.target.name]: -0 });
        } else {
          this.setState({ [e.target.name]: "" });
        }
      } else {
        this.setState({ [e.target.name]: parseFloat(e.target.value) });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    return (
      <div className="row grey lighten-2">
        <div className="col s12" style={{ padding: "0.75rem" }}>
          <h4>Make your own effect!</h4>

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col s12">
                <h6>Shape</h6>

                <p>
                  <label>
                    <input
                      type="radio"
                      name="shape"
                      value="circle"
                      checked={this.state.shape === "circle"}
                      onChange={this.handleChange}
                    />
                    <span>Circle</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="radio"
                      name="shape"
                      value="square"
                      checked={this.state.shape === "square"}
                      onChange={this.handleChange}
                    />
                    <span>Square</span>
                  </label>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <h6>Color</h6>
              </div>

              <div className="col s12">
                <input
                  type="color"
                  name="color"
                  value={this.state.color}
                  onChange={this.handleChange}
                  disabled={this.state.randomColor ? "disabled" : ""}
                />
              </div>

              <div className="col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="randomColor"
                      className="filled-in"
                      onChange={(e) =>
                        this.setState({ randomColor: e.target.checked })
                      }
                    />
                    <span>Random</span>
                  </label>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <h6>Size</h6>
              </div>

              <div className="col s6 input-field">
                <input
                  type="number"
                  name="size"
                  value={this.state.size}
                  min="2"
                  max="100"
                  step="0.01"
                  onChange={this.handleChange}
                  disabled={this.state.randomSize ? "disabled" : ""}
                />
              </div>

              <div className="col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="randomSize"
                      className="filled-in"
                      onChange={(e) =>
                        this.setState({ randomSize: e.target.checked })
                      }
                    />
                    <span>Random</span>
                  </label>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <h6>Start Position</h6>
              </div>

              <div className="col s6 input-field">
                <input
                  type="number"
                  name="x"
                  value={this.state.x}
                  step="0.01"
                  onChange={this.handleChange}
                  disabled={this.state.randomX ? "disabled" : ""}
                />
                <label htmlFor="x">Start X</label>
              </div>

              <div className="col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="randomX"
                      className="filled-in"
                      onChange={(e) =>
                        this.setState({ randomX: e.target.checked })
                      }
                    />
                    <span>Random</span>
                  </label>
                </p>
              </div>

              <div className="col s6 input-field">
                <input
                  type="number"
                  name="y"
                  value={this.state.y}
                  step="0.01"
                  onChange={this.handleChange}
                  disabled={this.state.randomY ? "disabled" : ""}
                />
                <label htmlFor="y">Start Y</label>
              </div>

              <div className="col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="randomY"
                      className="filled-in"
                      onChange={(e) =>
                        this.setState({ randomY: e.target.checked })
                      }
                    />
                    <span>Random</span>
                  </label>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <h6>Amount</h6>
              </div>

              <div className="col s6 input-field">
                <input
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  min="1"
                  max="300"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <h6>Animation Speed</h6>
              </div>

              <div className="col s6 input-field">
                <input
                  type="number"
                  name="speedX"
                  value={this.state.speedX}
                  min="-50"
                  max="50"
                  step="0.01"
                  onChange={this.handleChange}
                  disabled={this.state.randomSpeedX ? "disabled" : ""}
                />
                <label htmlFor="speedX">Speed X</label>
              </div>

              <div className="col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="randomSpeedX"
                      className="filled-in"
                      onChange={(e) =>
                        this.setState({ randomSpeedX: e.target.checked })
                      }
                    />
                    <span>Random</span>
                  </label>
                </p>
              </div>

              <div className="col s6 input-field">
                <input
                  type="number"
                  name="speedY"
                  value={this.state.speedY}
                  min="-50"
                  max="50"
                  step="0.01"
                  onChange={this.handleChange}
                  disabled={this.state.randomSpeedY ? "disabled" : ""}
                />
                <label htmlFor="speedY">Speed Y</label>
              </div>

              <div className="col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="randomSpeedY"
                      className="filled-in"
                      onChange={(e) =>
                        this.setState({ randomSpeedY: e.target.checked })
                      }
                    />
                    <span>Random</span>
                  </label>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <input
                  type="number"
                  name="speedSize"
                  value={this.state.speedSize}
                  min="-10"
                  max="10"
                  step="0.1"
                  onChange={this.handleChange}
                />
                <label htmlFor="speedSize">Speed Size</label>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <button type="submit" className="btn modal-close">
                  Start Effect
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EffectMaker;
