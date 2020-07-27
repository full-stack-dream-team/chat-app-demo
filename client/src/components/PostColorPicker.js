import React from "react";
import M from "materialize-css";

class PostColorPicker extends React.Component {
  componentDidMount() {
    this.selectInstance = M.FormSelect.init(this.Select, {});
  }

  render() {
    const { color, handleChange } = this.props;

    return (
      <div
        id="color-picker"
        className={`col s2 ml-1 input-field ${color || "cyan"} lighten-3`}
      >
        <select
          name="color"
          value={color}
          onChange={handleChange}
          ref={(Select) => {
            this.Select = Select;
          }}
        >
          <option value="">Default</option>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>
    );
  }
}

export default PostColorPicker;
