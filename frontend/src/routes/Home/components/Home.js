import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import orderby from 'lodash.orderby';
import pluck from 'lodash.pluck';
import Post from '../../../components/Post';
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

  handleActive = (tab) => {
    // alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    this.props.history.push(`/category/${tab.props.value}`);
    // this.updatePost(tab.props.value);
  };

  handleCancel = () => {
    this.setState({
      editing: false,
    });
  };

  handleChange = (event, index, value) => this.setState({ order: value })

  render() {
    const { counter, increment, doubleAsync, match, handleSubmit } = this.props;

    console.log(match);
    console.log(handleSubmit);

    return (
      <div>
        <Tabs
          initialSelectedIndex={-1}
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

        <div style={{ display: 'flex' }}>
          <button
            onClick={() => {
              this.setState({
                editing: true,
              });
            }}
          >
            Create New Post
          </button>

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
              <Post post={post} />
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

export default withRouter(Home);

// export default reduxForm({
//   form: 'create',
//   // validate,
// })(withRouter(Home));

// export default reduxForm({
//   form: 'Order',
//   validate,
// })(withStyles(styleSheet)(Order));
