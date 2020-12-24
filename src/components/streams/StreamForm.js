import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const errorClass = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={errorClass}>
        <label>{label}</label>
        <input {...input} autoComplete="off"></input>
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    //if we have visited the input and the error exist
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title: "
        ></Field>
        <Field
          name="desc"
          component={this.renderInput}
          label="Enter Description: "
        ></Field>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    //run if the user did not enter a title to their stream
    errors.title = "You must enter a title!";
  }
  if (!formValues.desc) {
    errors.desc = "You must enter a description!";
  }
  return errors;
};

export default reduxFormm = reduxForm({
  form: "StreamForm",
  validate,
})(StreamForm);
