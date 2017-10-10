import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      posts: [],
    };
  }

  componentDidMount() {
    api.get('categories').then((res) => {
      console.log(res.data);
      this.setState({
        categories: res.data.categories,
      });
    });

    api.get('posts').then((res) => {
      console.log(res.data);
      this.setState({
        posts: res.data,
        editing: false,
      });
    });
  }

  render() {
    const { counter, increment, doubleAsync, match } = this.props;

    console.log(match);

    return (
      <div>
        <h2>Home</h2>
        <div>
          <h2>Home: {counter}</h2>
          <button className='btn btn-primary' onClick={increment}>
            Increment
          </button>
          {' '}
          <button className='btn btn-secondary' onClick={doubleAsync}>
            Double (Async)
          </button>
        </div>
        <ul>
          <li
            onClick={() => {
              this.setState({
                editing: true,
              });
            }}
          >
            Create New Post
          </li>
        </ul>

        {this.state.editing ? (
          <div>
            <form>
              <input type='text' placeholder='Title' name='title' />
              <select name='cateogry'>
                {this.state.categories.map(category => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
              <textarea name='body' />
              <input type='submit' value='Submit' />
              <button onClick={() => {
                this.setState({
                  editing: false,
                });
              }}
              >Cancel</button>
            </form>
          </div>
        ) : null}

        <h2>Categories</h2>
        <ul>
          {this.state.categories.map(category => (
            <li key={category.name}>
              <Link to={`/${category.path}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <Link
                to={`/posts/${post.id}`}
              >
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
    );
  }
}

Home.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired, // TODO: Use shape
};

export default Home;
