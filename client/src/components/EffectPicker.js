import React from "react";
import M from "materialize-css";
import { InlineIcon } from "@iconify/react";
import partyIcon from "@iconify/icons-mdi/party-popper";

class EffectPicker extends React.Component {
  effects = ["swirl", "explode", "rain", "refresh"];

  componentDidMount() {
    M.Modal.init(this.Modal, {});
  }

  render() {
    return (
      <>
        <span
          data-target="effect-modal"
          className="btn-icon btn-flat modal-trigger"
          style={{
            fontSize: "30px",
          }}
        >
          <InlineIcon icon={partyIcon} className="purple-text text-lighten-1" />
        </span>

        <div
          id="effect-modal"
          className="modal"
          ref={(Modal) => {
            this.Modal = Modal;
          }}
        >
          <div className="modal-content left-align">
            <h4>Effects</h4>
            <p>Send effects to anyone instantly with the click of a button!</p>

            {this.effects.map((effect) => (
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
          <div className="modal-footer">
            <span className="btn-flat modal-close">Cancel</span>
          </div>
        </div>
      </>
    );
  }
}

export default EffectPicker;
