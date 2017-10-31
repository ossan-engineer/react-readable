import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import orderby from 'lodash.orderby';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import moment from 'moment';
import Comment from './Comment';
import api from '../utils/api';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        editing: false,
      },
      newComment: {},
      comments: [],
    };

    console.log(props.match);
  }

  componentDidMount() {
    api.get(`posts/${this.props.match.params.id}`).then((res) => {
      console.log(res.data);
      this.setState({
        post: res.data,
      });
    });

    api.get(`posts/${this.props.match.params.id}/comments`).then((res) => {
      console.log(res.data);
      this.setState({
        comments: res.data,
      });
    })
  }

  handleSubmitComment = (values) => {
    console.log(values);
    api.post('comments', values);
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
    const { handleSubmit, pristine, submitting, valid } = this.props;
    const { post } = this.state;

    return (
      <div>
        {this.state.post.editing ? (
          <Card style={{ marginTop: 15, marginBottom: 15 }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton tooltip='up'>
                  <KeyboardArrowUp />
                </IconButton>
                <div>
                  <span style={{ fontSize: 24, margin: '0 5px' }}>{post.voteScore ? post.voteScore : 0}</span>
                  votes
                </div>
                <IconButton tooltip='down'>
                  <KeyboardArrowDown />
                </IconButton>
              </div>
            </CardHeader>

            <Divider />

            <CardTitle title={<input type='text' name='title' value={this.state.post.title} />} subtitle={<input type='text' name='author' value={this.state.post.author} />} />
            <CardText>
              <div>
                <form
                  onSubmit={handleSubmit(values => {
                    console.log(values);
                  })}
                >
                  <input type='submit' value='Save' />
                  <button onClick={() => {
                    const newPost = Object.assign({}, this.state.post, {
                      editing: false,
                    });

                    this.setState({
                      post: newPost,
                    });
                  }}>Cancel</button>

                  <input type='text' name='timestamp' value={this.state.post.timestamp} />

                  <input type='text' name='category' value={this.state.post.category} />
                  <input type='text' name='body' value={this.state.post.body} />
                  <input type='text' name='voteScore' value={this.state.post.voteScore} />
                </form>
              </div>
            </CardText>
          </Card>
        ) : (
          <Card style={{ marginTop: 15, marginBottom: 15 }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton tooltip='up'>
                  <KeyboardArrowUp />
                </IconButton>
                <div>
                  <span style={{ fontSize: 24, margin: '0 5px' }}>{post.voteScore ? post.voteScore : 0}</span>
                  votes
                </div>
                <IconButton tooltip='down'>
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
              <div>{post.body}</div>
              <div style={{display: 'flex', margin: '30px 0'}}>
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

              <FlatButton onClick={() => {
                const newPost = Object.assign({}, this.state.post, {
                  editing: true,
                });

                this.setState({
                  post: newPost,
                });
              }}>Edit
              </FlatButton>
              <FlatButton onClick={() => {
              }}>Delete
              </FlatButton>
            </CardText>
          </Card>
        )}

        <Card>
          <CardText>
            <div>
              <form
                onSubmit={handleSubmit((values) => {
                  console.log(values);
                  this.handleSubmitComment(values);
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
            </div>

            <Divider style={{
              marginTop: 30,
              marginBottom: 30,
              marginLeft: -16,
              marginRight: -16,
            }}
            />

            <ul>
              {orderby(this.state.comments, 'voteScore', 'desc').map(comment => (
                <li key={comment.id}>
                  <Comment {...comment} />
                  <Divider style={{
                    marginTop: 30,
                    marginBottom: 30,
                    marginLeft: -16,
                    marginRight: -16,
                  }}
                  />
                </li>
              ))}
            </ul>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default reduxForm({
  form: 'postDetail',
  // validate,
})(PostDetail);
