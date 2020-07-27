import React from "react";
import MainChatBox from "../components/MainChatBox";
import LoadingSplash from "../components/LoadingSplash";

class App extends React.Component {
  render() {
    return true ? (
      <LoadingSplash />
    ) : (
      <div className="container">
        <MainChatBox
          postMessage={this.props.postMessage}
          deletePost={this.props.deletePost}
          makeChatBoxRef={this.props.makeChatBoxRef}
          chat={this.props.chat}
        />
      </div>
    );
  }
}

export default App;
