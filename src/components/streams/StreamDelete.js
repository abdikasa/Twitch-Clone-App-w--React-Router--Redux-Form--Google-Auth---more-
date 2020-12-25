import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return (
      <>
        {`Are you sure you want to delete the stream with title: `}{" "}
        <b>{this.props.stream.title}</b>
      </>
    );
  }

  createActions = () => {
    return (
      <React.Fragment>
        <button
          to={"/"}
          className="ui button negative"
          onClick={() => {
            if (!this.props.stream) {
              this.disabled = true;
              return;
            }
            this.onDelete();
          }}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.createActions()}
        dismissAction={() => history.push("/")}
      ></Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
