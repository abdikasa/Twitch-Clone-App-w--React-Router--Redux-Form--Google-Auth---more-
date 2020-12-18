import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "./actions";

class GoogleAuth extends Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton = () => {
    if (this.state.isSignedIn === null) return null;
    if (this.state.isSignedIn === false) {
      return (
        <button
          className="ui green google button"
          onClick={() => {
            console.log("current status: ", this.auth.isSignedIn.get());
            console.log("attempting to update state");
            this.auth.signIn();
            console.log("new status: ", this.auth.isSignedIn.get());
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
          console.log("current status: ", this.auth.isSignedIn.get());
          console.log("attempting to update state");
          this.auth.signOut();
          console.log("new status: ", this.auth.isSignedIn.get());
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

export default connect(null, { signIn, signOut })(GoogleAuth);
