import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

export const validate = (values) => {
  const errors = {};
  const requiredField = ['title', 'author', 'category', 'body'];

  requiredField.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'ERROR';
    }
  });

  return errors;
};

const renderTextField = ({
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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
}) => (
  <SelectField
    floatingLabelText='Category'
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
  >
    <MenuItem value='react' primaryText='React' />
    <MenuItem value='redux' primaryText='Redux' />
    <MenuItem value='udacity' primaryText='Udacity' />
  </SelectField>
);

const CreatePost = ({ handleSubmit, categories, onCancel, createPostAsync, pristine, submitting, valid }) => (
  <Card style={{ marginBottom: 15 }}>
    <CardText>
      <form onSubmit={handleSubmit(values => {
        console.log(values);
        createPostAsync(values).then(() => window.location.href = '/');
      })}>
        <Field
          name='title'
          label='Title'
          component={renderTextField}
          type='text'
          fullWidth
          required
        /><br />
        <Field
          name='author'
          label='Author'
          component={renderTextField}
          type='text'
          fullWidth
          required
        /><br />
        <Field
          name='category'
          component={renderSelectField}
          fullWidth
          required
        /><br />
        <Field
          name='body'
          label='Body'
          component={renderTextField}
          type='text'
          fullWidth
          multiLine
          rows={3}
        /><br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FlatButton
            label='Submit'
            type='submit'
            primary
            disabled={pristine || submitting || !valid}
          />
          <FlatButton
            label='Cancel'
            onClick={onCancel}
          />
        </div>
      </form>
    </CardText>
  </Card>
);

export default reduxForm({
  form: 'createPost',
  validate,
})(CreatePost);
