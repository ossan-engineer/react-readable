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
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import api from '../../../utils/api';
import CreatePostContainer from '../../../containers/CreatePostContainer';

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

  handleActive = (tab) => {
    // alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    this.props.history.push(`/category/${tab.props.value}`);
    // this.updatePost(tab.props.value);
  }

  handleCancel = () => {
    this.setState({
      editing: false,
    });
  }

  render() {
    const { counter, increment, doubleAsync, match, handleSubmit } = this.props;

    console.log(match);
    console.log(handleSubmit);

    return (
      <div>
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
            <CreatePostContainer categories={this.state.categories} onCancel={this.handleCancel} />
          </div>
        ) : null}

        <Tabs initialSelectedIndex={-1}>
          {this.state.categories.map(category => (
            <Tab
              label={category.name}
              key={category.name}
              onActive={this.handleActive}
              value={category.name}
            />
          ))}
        </Tabs>

        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <Card style={{ marginBottom: 15 }}>
                <CardHeader
                  title={post.voteScore}
                />
                <Divider />
                <Link
                  to={`/posts/${post.id}`}
                >
                  <CardTitle title={post.title} subtitle={`${post.author}`} />
                </Link>
                <CardText>
                  {post.body}
                  <div style={{ display: 'flex' }}>
                    <Chip>
                      {post.category}
                    </Chip>
                    <Chip backgroundColor='rgba(255, 255, 255, 1)'>
                      {post.timestamp}
                    </Chip>
                  </div>
                </CardText>
              </Card>
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
