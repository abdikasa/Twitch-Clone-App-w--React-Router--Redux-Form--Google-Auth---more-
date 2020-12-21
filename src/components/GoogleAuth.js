import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut, fetchStatus } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    this.props.fetchStatus(this.onAuthChange);
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.props.current.user.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton = () => {
    if (this.props.current.isSignedIn === null) {
      return null;
    }
    if (this.props.current.isSignedIn === false) {
      return (
        <button
          className="ui green google button"
          onClick={() => this.props.current.user.signIn()}
        >
          <i className="google icon" />
          Sign In
        </button>
      );
    }
    return (
      <button
        className="ui red google button"
        onClick={() => this.props.current.user.signOut()}
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
  return {
    current: {
      isSignedIn: state.currentStatus.isSignedIn,
      user: state.current,
    },
  };
};

export default connect(mapStateToProps, { signIn, signOut, fetchStatus })(
  GoogleAuth
);
