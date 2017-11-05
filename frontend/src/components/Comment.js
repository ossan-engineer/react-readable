import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import moment from 'moment';
import './Comment.css';
import {loadExistingData} from '../modules/comment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      id: props.id,
      parentId: props.parentId,
      timestamp: props.timestamp,
      author: props.author,
      body: props.body,
      voteScore: props.voteScore,
      deleted: props.deleted,
      parentDeleted: props.parentDeleted,
    };
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
    const {
      id,
      parentId,
      timestamp,
      author,
      body,
      voteScore,
      deleted,
      parentDeleted,
      editCommentAsync,
      removeCommentAsync,
      handleDelete,
      history,
      match,
      handleSubmit,
      loadExistingData,
    } = this.props;

    return (
      <div>
        {this.state.editing ? (
          <div>
            <form onSubmit={handleSubmit(values => {
              editCommentAsync(values.id, values.body, values.timestamp);
            })}
            >
              <Field
                name='timestamp'
                label='Timestamp'
                type='text'
                component={this.renderTextField}
                fullWidth
              />
              <Field
                name='author'
                label='Author'
                type='text'
                component={this.renderTextField}
                fullWidth
              />
              <Field
                name='body'
                label='Comment'
                type='text'
                component={this.renderTextField}
                fullWidth
              />
              <div>
                deleted: {deleted.toString()}
              </div>
              <div>
                parentDeleted: {parentDeleted.toString()}
              </div>
              <FlatButton type='submit'>
                Save
              </FlatButton>
              <FlatButton onClick={() => {
                this.setState({
                  editing: false,
                });
              }}>Cancel</FlatButton>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ margin: '15px 0' }}>
              {author}: {body}
            </div>
            <div style={{ color: '#ccc' }}>
              {moment(timestamp).format('YYYY/MM/DD HH:mm:ss')}
            </div>
            <div style={{ color: '#ccc', marginTop: 10 }}>
              deleted: {deleted.toString()} <br />
              parentDeleted: {parentDeleted.toString()}
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
              <IconButton tooltip='up'>
                <KeyboardArrowUp />
              </IconButton>
              <div>
                <span style={{ margin: '0 5px' }}>{voteScore}</span>
              </div>
              <IconButton tooltip='down'>
                <KeyboardArrowDown />
              </IconButton>
            </div>
            <FlatButton onClick={() => {
              this.setState({
                editing: true,
              });
              console.log(this.state);
              loadExistingData(this.state);
            }}>
              Edit
            </FlatButton>
            <FlatButton onClick={() => {
              if (window.confirm('Are you sure?')) {
                removeCommentAsync(id).then(() => history.push(match.url));
              }
            }}>
              Delete
            </FlatButton>
          </div>
        )}
      </div>
    )
  }
}

export default reduxForm({
  form: 'comment',
  enableReinitialize: true,
  // validate,
})(withRouter(Comment));
