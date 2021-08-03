import React from "react";
import M from "materialize-css";

class EffectPicker extends React.Component {
  effects = ["swirl", "explode", "rain", "refresh", "confetti", "bouncy balls"];

  componentDidMount() {
    M.Modal.init(this.Modal, {});
  }

  render() {
    return (
      <>
        <div
          id="effect-modal"
          className="modal modal-fixed-footer"
          ref={Modal => {
            this.Modal = Modal;
          }}
        >
          <div className="modal-content left-align">
            <div className="row">
              <div className="col s12">
                <h4>Effects</h4>
                <p>
                  Send effects to anyone instantly with the click of a button!
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                {this.effects.map(effect => (
                  <div key={effect} className="mb-1">
                    <span
                      className="btn modal-close"
                      onClick={() => this.props.sendEffect(effect)}
                    >
                      {effect}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <span className="btn-flat modal-close">Cancel</span>
          </div>
        </div>
      </>
    );
  }
}

export default EffectPicker;
