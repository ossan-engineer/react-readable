import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import orderby from 'lodash.orderby';
import CategoryTabs from '../../../components/CategoryTabs';
import PostSummaryContainer from '../../../containers/PostSummaryContainer';
import api from '../../../utils/api';
import CreatePostContainer from '../../../containers/CreatePostContainer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      posts: [],
      // comments: {},
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

    api.get('posts')
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data,
          editing: false,
        });
        return res;
      });
  }

  updatePosts = () => {
    api.get('posts')
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data,
          editing: false,
        });
        return res;
      });
  };

  handleActive = (tab) => {
    // alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    this.props.history.push(`/category/${tab.props.value}`);
    // this.updatePosts(tab.props.value);
  };

  handleCancel = () => {
    this.setState({
      editing: false,
    });
  };

  handleChange = (event, index, value) => this.setState({ order: value });

  render() {
    const { counter, increment, doubleAsync, match, handleSubmit } = this.props;

    console.log(match);
    console.log(handleSubmit);

    return (
      <div>
        <CategoryTabs />

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
            <CreatePostContainer categories={this.state.categories} onCancel={this.handleCancel} />
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
    );
  }
}

Home.propTypes = {
  match: PropTypes.object.isRequired, // TODO: Use shape
};

export default withRouter(Home);

// export default reduxForm({
//   form: 'create',
//   // validate,
// })(withRouter(Home));

// export default reduxForm({
//   form: 'Order',
//   validate,
// })(withStyles(styleSheet)(Order));
