import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import Comment from './Comment';
import api from '../utils/api';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        editing: false,
      },
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
    // const {match} = this.props;

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
          <div>
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
            <div>title: {this.state.post.title}</div>
            <div>timestamp: {this.state.post.timestamp}</div>
            <div>author: {this.state.post.author}</div>
            <div>category: {this.state.post.category}</div>
            <div>body: {this.state.post.body}</div>
            <div>voteScore: {this.state.post.voteScore}</div>

            <form>
              <input type='text' name='comment' placeholder='Your Comment' />
              <input type='submit' value='Submit' />
            </form>
          </div>
        )}

        <ul>
          {this.state.comments.map(comment => (
            <li key={comment.id}>
              <Comment {...comment} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Detail;
