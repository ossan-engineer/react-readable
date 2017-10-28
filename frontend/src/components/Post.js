import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
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
import IconButton from 'material-ui/IconButton';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import moment from 'moment';
import api from '../utils/api';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    api.get(`posts/${this.props.post.id}/comments`)
      .then((res) => {
        this.setState({
          comments: res.data,
        });
      });
  }

  render() {
    const { post } = this.props;

    return (
      <Card style={{ marginBottom: 15 }}>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton tooltip='up'>
              <KeyboardArrowUp />
            </IconButton>
            <div>
              <span style={{ fontSize: 24, margin: '0 5px' }}>{post.voteScore}</span>
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
    );
  }
}

export default Post;
