import React from "react";
import MainChatBox from "../components/MainChatBox";
import LoadingSplash from "../components/LoadingSplash";

import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <>
        {this.props.postsLoading ? <LoadingSplash /> : null}

        <div className="container">
          <MainChatBox />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  postsLoading: state.chat.postsLoading,
});

export default connect(mapStateToProps)(App);
