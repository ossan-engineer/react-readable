import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import moment from 'moment';
import api, { apiClient } from '../utils/api';
import { commentsAsync } from '../modules/postSummary';

class PostSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      editing: false,
    };
  }

  componentDidMount() {
    this.props.commentsAsync(this.props.post.id)
      .then(res => this.setState({
        comments: res,
      }));
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

  renderSelectField = ({
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


  render() {
    const { post, voteAsync, commentsAsync, updatePosts, handleSubmit, editPostAsync, loadExistingData } = this.props;

    return (
      <div>
        {this.state.editing ? (
          <Card style={{ marginTop: 15, marginBottom: 15 }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  tooltip='up'
                  onClick={() => voteAsync(post.id, 'upVote').then(() => this.updatePost(post.category))}
                >
                  <KeyboardArrowUp />
                </IconButton>
                <div>
                  <span style={{ fontSize: 24, margin: '0 5px', fontWeight: 'bold' }}>{post.voteScore}</span>
                  votes
                </div>
                <IconButton
                  tooltip='down'
                  onClick={() => voteAsync(post.id, 'downVote').then(() => this.updatePost(post.category))}
                >
                  <KeyboardArrowDown />
                </IconButton>
              </div>
            </CardHeader>

            <Divider />

            <form
              onSubmit={handleSubmit((values) => {
                editPostAsync(post.id, values.title, values.body).then(() => {
                  updatePosts();
                  this.setState({
                    editing: false,
                  })
                });
              })}
            >
              <CardTitle
                title={
                  <Field
                    name='title'
                    label='Title'
                    type='text'
                    component={this.renderTextField}
                    fullWidth
                  />
                }
                subtitle={post.author}
              />
              <CardText>
                <Field
                  name='body'
                  label='Body'
                  type='text'
                  component={this.renderTextField}
                  multiLine
                  rows={3}
                  fullWidth
                />
                <div style={{ display: 'flex', margin: '30px 0' }}>
                  <Chip>
                    {post.category}
                  </Chip>
                  <Chip backgroundColor='rgba(255, 255, 255, 1)'>
                    {moment(post.timestamp).format('YYYY/MM/DD HH:mm:ss')}
                  </Chip>
                  <Chip backgroundColor='rgba(255, 255, 255, 1)'>
                    {this.state.comments.length} Comments
                  </Chip>
                </div>
                <FlatButton type='submit'>
                  Save
                </FlatButton>
                <FlatButton onClick={() => {
                  this.setState({
                    editing: false,
                  });
                }}
                >
                  Cancel
                </FlatButton>
              </CardText>
            </form>
          </Card>
        ) : (
          <Card style={{ marginBottom: 15 }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  tooltip='up'
                  onClick={() => voteAsync(post.id, 'upVote').then(() => updatePosts(post.category))}
                >
                  <KeyboardArrowUp />
                </IconButton>
                <div>
                  <span style={{ fontSize: 24, margin: '0 5px', fontWeight: 'bold' }}>{post.voteScore}</span>
                  votes
                </div>
                <IconButton
                  tooltip='down'
                  onClick={() => voteAsync(post.id, 'downVote').then(() => updatePosts(post.category))}
                >
                  <KeyboardArrowDown />
                </IconButton>
              </div>
            </CardHeader>

            <Divider />
            <Link
              to={`/posts/${post.id}`}
            >
              <CardTitle title={post.title} subtitle={`${post.author}`} />
            </Link>
            <CardText>
              {post.body}
              <div style={{ display: 'flex', marginTop: 30 }}>
                <Chip>
                  {post.category}
                </Chip>
                <Chip backgroundColor='rgba(255, 255, 255, 1)'>
                  {moment(post.timestamp).format('YYYY/MM/DD HH:mm:ss')}
                </Chip>
                <Chip backgroundColor='rgba(255, 255, 255, 1)'>
                  {this.state.comments.length} Comments
                </Chip>
              </div>

              <div style={{ margin: '15px 0' }}>
                <FlatButton onClick={() => {
                  this.setState({
                    editing: true,
                  });

                  loadExistingData(this.state.post);
                }}
                >Edit
                </FlatButton>
                <FlatButton onClick={() => {
                  window.confirm('Are you sure?') && apiClient.delete(`posts/${post.id}`).then(() => {
                    updatePosts();
                  });
                }}
                >Delete
                </FlatButton>
              </div>
            </CardText>
          </Card>
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: 'postSummary',
  enableReinitialize: true,
  // validate,
})(withRouter(PostSummary));
