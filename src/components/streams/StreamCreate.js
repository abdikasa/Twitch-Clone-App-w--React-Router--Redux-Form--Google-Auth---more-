import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput = ({ input }) => {
    return <input {...input}></input>;
  };

  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput}></Field>
        <Field name="desc" component={this.renderInput}></Field>
      </form>
    );
  }
}

export default reduxForm({
  form: "StreamCreate",
})(StreamCreate);
