import React from "react";
import MainChatBox from "../components/MainChatBox";
import LoadingSplash from "../components/LoadingSplash";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <MainChatBox
          postMessage={this.props.postMessage}
          editPost={this.props.editPost}
          deletePost={this.props.deletePost}
          makeChatBoxRef={this.props.makeChatBoxRef}
          chat={this.props.chat}
        />
      </div>
    );
  }
}

export default App;
