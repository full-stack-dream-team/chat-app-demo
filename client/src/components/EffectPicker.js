import React from "react";
import M from "materialize-css";
import { InlineIcon } from "@iconify/react";
import partyIcon from "@iconify/icons-mdi/party-popper";

class EffectPicker extends React.Component {
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

            <span
              className="btn modal-close"
              onClick={() => this.props.sendEffect("swirl")}
            >
              Swirl
            </span>
            <br />
            <span
              className="btn modal-close mt-1"
              onClick={() => this.props.sendEffect("explode")}
            >
              Explode
            </span>
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
