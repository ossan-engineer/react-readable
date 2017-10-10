import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      posts: [],
    }
  }

  componentDidMount() {
    api.get(`categories`).then((res) => {
      console.log(res.data);
      this.setState({
        categories: res.data.categories,
      })
    });

    this.updatePost(this.props.match.params.category);
  }

  updatePost = (category) => {
    console.log(category);

    this.setState({
      posts: [],
    });

    api.get(`${category}/posts`).then((res) => {
      console.log(res.data);
      this.setState({
        posts: res.data,
      });
    });
  };

  render() {
    const { match } = this.props;

    console.log(match);

    return (
      <div>
        <h2>{match.params.category}</h2>
        <ul>
          {this.state.categories.map(category => (
            <li key={category.name}>
              <Link
                to={`/${category.path}`}
                onClick={() => this.updatePost(category.path)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <div>title: {post.title}</div>
                <div>timestamp: {post.timestamp}</div>
                <div>author: {post.author}</div>
                <div>category: {post.category}</div>
                <div>body: {post.body}</div>
                <div>voteScore: {post.voteScore}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Category;
