import { render } from "@testing-library/react";
import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    //stops player and unmounts the listener attached to the video tag.
    this.player.destroy();
  }

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      //if video player already exists or the stream is not fetched
      return;
    }
    const { id } = this.props.match.params;
    this.flvplayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.flvplayer.attachMediaElement(this.videoRef.current);
    this.flvplayer.load();
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      const { title, desc } = this.props.stream;
      return (
        <div>
          <video ref={this.videoRef} style={{ width: "100%" }} controls></video>
          <h1>{title}</h1>
          <h5>{desc}</h5>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
