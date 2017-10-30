import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import orderby from 'lodash.orderby';
import api from '../../../utils/api';
import PostSummaryContainer from '../../../containers/PostSummaryContainer';
import CreatePostContainer from '../../../containers/CreatePostContainer';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      posts: [],
      order: 'voteScore',
      editing: false,
    };
  }

  componentDidMount() {
    api.get('categories').then((res) => {
      console.log(res.data);
      this.setState({
        categories: res.data.categories,
      });
    });

    this.updatePosts(this.props.match.params.category);
  }

  updatePosts = (category) => {
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
    this.updatePosts(tab.props.value);
  };

  handleChange = (event, index, value) => this.setState({ order: value });

  handleCancel = () => {
    this.setState({
      editing: false,
    });
  };

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
              label={<span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{category.name}</span>}
              key={category.name}
              onActive={this.handleActive}
              value={category.name}
            />
          ))}
        </Tabs>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!this.state.editing ? (
            <FlatButton
              label='Create New Post'
              onClick={() => {
                this.setState({
                  editing: true,
                });
              }}
            />
          ) : (
            <div />
          )}
          <SelectField
            floatingLabelText='Sort By'
            value={this.state.order}
            onChange={this.handleChange}
          >
            <MenuItem value='voteScore' primaryText='Best' />
            <MenuItem value='timestamp' primaryText='Latest' />
          </SelectField>
        </div>

        {this.state.editing ? (
          <div>
            <CreatePostContainer
              categories={this.state.categories}
              onCancel={this.handleCancel}
              category={match.params.category}
            />
          </div>
        ) : null}

        <ul>
          {orderby(this.state.posts, this.state.order, 'desc').map(post => (
            <li key={post.id}>
              <PostSummaryContainer
                post={post}
                updatePosts={this.updatePosts}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(Categories);
