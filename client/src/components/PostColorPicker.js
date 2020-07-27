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
        className={`col s7 ml-1 input-field ${color || "cyan"} lighten-3`}
      >
        <select
          name="color"
          value={color}
          onChange={handleChange}
          ref={(Select) => {
            this.Select = Select;
          }}
        >
          <option value="">Cyan (Default)</option>
          <option value="white">White</option>
          <option value="blue-grey">Grey</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="light-green">Light Green</option>
          <option value="lime">Lime</option>
          <option value="orange">Orange</option>
          <option value="deep-orange">Deep Orange</option>
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="teal">Teal</option>
          <option value="blue">Blue</option>
          <option value="brown">Brown</option>
        </select>
      </div>
    );
  }
}

export default PostColorPicker;
