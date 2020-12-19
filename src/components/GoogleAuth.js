import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut, fetchStatus } from "./actions";

class GoogleAuth extends Component {
  componentDidMount() {
    this.props.fetchStatus();
  }

  renderAuthButton = () => {
    if (this.props.currentStatus.isSignedIn === null) {
      return null;
    }
    if (this.props.currentStatus.isSignedIn === false) {
      return (
        <button
          className="ui green google button"
          onClick={() => {
            this.props.current.signIn();
          }}
        >
          <i className="google icon" />
          Sign In
        </button>
      );
    }
    return (
      <button
        className="ui red google button"
        onClick={() => {
          this.props.current.signOut();
        }}
      >
        <i className="google icon" />
        Sign Out
      </button>
    );
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { current: state.current, currentStatus: state.currentStatus };
};

export default connect(mapStateToProps, { signIn, signOut, fetchStatus })(
  GoogleAuth
);
