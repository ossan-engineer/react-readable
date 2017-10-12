import React from 'react';
import { Field, reduxForm } from 'redux-form';

const CreatePost = ({ handleSubmit, categories, onCancel }) => (
  <form onSubmit={handleSubmit(values => console.log(values))}>
    <Field name='title' component='input' type='text' />
    <Field name='category' component='select'>
      {categories.map(category => (
        <option value={category.name} key={category.name}>{category.name}</option>
      ))}
    </Field>
    <Field name='body' component='textarea' type='text' />
    <input type='submit' value='Submit' />
    <button onClick={onCancel}
    >Cancel</button>
  </form>
);

export default reduxForm({
  form: 'create',
})(CreatePost);
