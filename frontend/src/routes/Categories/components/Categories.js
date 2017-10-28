import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import Post from '../../../components/Post';
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
    this.props.history.push(`/category/${tab.props.value}`);
    this.updatePost(tab.props.value);
  }

  render() {
    const { match } = this.props;

    console.log(match);

    return (
      <div>
        <Tabs
          value={match.params.category}
          tabItemContainerStyle={{
            backgroundColor: 'transparent',
          }}
        >
          {this.state.categories.map(category => (
            <Tab
              label={<span style={{ color: '#0275d8' }}>{category.name}</span>}
              key={category.name}
              onActive={this.handleActive}
              value={category.name}
            />
          ))}
        </Tabs>

        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(Categories);
