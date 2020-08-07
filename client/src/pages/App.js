import React from "react";
import MainChatBox from "../components/MainChatBox";
import LoadingSplash from "../components/LoadingSplash";

import { connect } from "react-redux";
import { startSocket } from "../redux/actions/chatActions";

class App extends React.Component {
  componentDidMount() {
    this.props.startSocket(this.props.match.params.roomId);
  }

  render() {
    return (
      <>
        {this.props.postsLoading ? <LoadingSplash /> : null}

        <div className="container">
          <MainChatBox roomId={this.props.match.params.roomId} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  postsLoading: state.chat.postsLoading,
});

export default connect(mapStateToProps, { startSocket })(App);
