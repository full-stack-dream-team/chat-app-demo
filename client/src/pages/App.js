import React from "react";
import MainChatBox from "../components/MainChatBox";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <MainChatBox
          postMessage={this.props.postMessage}
          deletePost={this.props.deletePost}
          makeChatBoxRef={this.props.makeChatBoxRef}
          chat={this.props.chat}
        />

        {/*<div className="row">
          <div className="col s12">
            <ul className="collection with-header">
              <li className="collection-header">Currently Online</li>
              {this.state.chattingUsers.map((user) => (
                <li key={user.id || user._id} className="collection-item">
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>*/}
      </div>
    );
  }
}

export default App;
