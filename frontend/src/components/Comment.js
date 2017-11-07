import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import moment from 'moment';
import './Comment.css';

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
      voteAsync,
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
      updateComments,
    } = this.props;

    return (
      <div>
        {this.state.editing ? (
          <div>
            <form onSubmit={handleSubmit((values) => {
              editCommentAsync(values.id, values.body, values.timestamp)
                .then(() => updateComments())
                .then(() => this.setState({
                  editing: false,
                }));
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
              }}
              >Cancel</FlatButton>
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
              <IconButton
                tooltip='up'
                onClick={() => voteAsync(id, 'upVote').then(() => updateComments())}
              >
                <KeyboardArrowUp />
              </IconButton>
              <div>
                <span style={{ margin: '0 5px' }}>{voteScore}</span>
              </div>
              <IconButton
                tooltip='down'
                onClick={() => voteAsync(id, 'downVote').then(() => updateComments())}
              >
                <KeyboardArrowDown />
              </IconButton>
            </div>
            <FlatButton onClick={() => {
              this.setState({
                editing: true,
              });
              console.log(this.state);
              loadExistingData(this.state);
            }}
            >
              Edit
            </FlatButton>
            <FlatButton onClick={() => {
              if (window.confirm('Are you sure?')) {
                removeCommentAsync(id).then(() => history.push(match.url));
              }
            }}
            >
              Delete
            </FlatButton>
          </div>
        )}
      </div>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  deleted: PropTypes.string.isRequired,
  parentDeleted: PropTypes.string.isRequired,
  editCommentAsync: PropTypes.func.isRequired,
  removeCommentAsync: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadExistingData: PropTypes.func.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'comment',
  enableReinitialize: true,
  // validate,
})(withRouter(Comment));
