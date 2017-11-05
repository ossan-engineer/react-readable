import React, { Component } from 'react';
// import { with } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class CreateComment extends Component {
  constructor(props) {
    super(props);
  }

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
    const { handleSubmit, pristine, submitting, valid, createCommentAsync, match, updateComments } = this.props;

    return (
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values);
          createCommentAsync(values, match.params.id).then(() => updateComments());
        })}
      >
        <Field
          name='author'
          label='Author'
          fullWidth
          component={this.renderTextField}
        /><br />
        <Field
          name='body'
          label='Comment'
          fullWidth
          multiLine
          rows={3}
          component={this.renderTextField}
        /><br />
        <FlatButton
          label='Submit'
          type='submit'
          primary
          disabled={pristine || submitting || !valid}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'createComment',
  // validate,
})(CreateComment);
