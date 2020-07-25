import React from "react";

class LoadingSplash extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundColor: "red",
          zIndex: "999",
        }}
      ></div>
    );
  }
}

export default LoadingSplash;
