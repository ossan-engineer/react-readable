import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import orderby from 'lodash.orderby';
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

  render() {
    const { post } = this.state;

    return (
      <div>
        {this.state.post.editing ? (
          <div>
            <form>
              <input type='submit' value='Save' />
              <button onClick={() => {
                const newPost = Object.assign({}, this.state.post, {
                  editing: false,
                });

                this.setState({
                  post: newPost,
                });
              }}>Cancel</button>
              <input type='text' name='title' value={this.state.post.title} />
              <input type='text' name='timestamp' value={this.state.post.timestamp} />
              <input type='text' name='author' value={this.state.post.author} />
              <input type='text' name='category' value={this.state.post.category} />
              <input type='text' name='body' value={this.state.post.body} />
              <input type='text' name='voteScore' value={this.state.post.voteScore} />
            </form>
          </div>
        ) : (
          <Card style={{ marginBottom: 15 }}>
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

            <button onClick={() => {
              const newPost = Object.assign({}, this.state.post, {
                editing: true,
              });

              this.setState({
                post: newPost,
              });
            }}>Edit
            </button>
            <button onClick={() => {
            }}>Delete
            </button>

            <CardText>
              {post.body}
              <div style={{display: 'flex', marginTop: 30}}>
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
            </CardText>
          </Card>
        )}

        <form>
          <input type='submit' value='Save' />
          <button onClick={() => {
            this.setState({
              newComment: {
                editing: false,
              }
            });
          }}>Cancel</button>
          <input type='text' name='body' value={this.state.newComment.body} />
          <input type='text' name='author' value={this.state.newComment.author} />
          <input type='text' name='voteScore' value={this.state.newComment.voteScore} />
        </form>

        <ul>
          {orderby(this.state.comments, 'voteScore', 'desc').map(comment => (
            <li key={comment.id}>
              <Comment {...comment} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PostDetail;
