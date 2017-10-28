import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import api from '../../../utils/api';

class Categories extends Component {
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

  handleActive = (tab) => {
    // alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    this.props.history.push(tab.props.value);
    this.updatePost(tab.props.value);
  }

  render() {
    const { match } = this.props;

    console.log(match);

    return (
      <div>
        <h2>{match.params.category}</h2>
        <Tabs value={match.params.category}>
          {this.state.categories.map(category => (
            <Tab
              label={category.name}
              key={category.name}
              onActive={this.handleActive}
              value={category.name}
            />
          ))}
        </Tabs>

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
                <div>delted: {post.deleted.toString()}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(Categories);
