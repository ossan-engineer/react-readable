import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import moment from 'moment';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
       editing: false
    }
  }

  render() {
    const {
      id,
      parentId,
      timestamp,
      author,
      body,
      voteScore,
      deleted,
      parentDeleted,
      removeCommentAsync,
      handleDelete,
      history,
      match,
    } = this.props;

    return (
      <div>
        {this.state.editing ? (
          <div>
            <form>
              <div>
                timestamp: <input type='text' name='timestamp' value={moment(timestamp).format('YYYY/MM/DD HH:mm:ss')} />
              </div>
              <div>
                author: <input type='text' name='author' value={author} />
              </div>
              <div>
                body: <input type='text' name='body' value={body} />
              </div>
              <div>
                deleted: {deleted.toString()}
              </div>
              <div>
                parentDeleted: {parentDeleted.toString()}
              </div>
              <FlatButton type='submit'>
                Save
              </FlatButton>
              <FlatButton onClick={() => {
                this.setState({
                  editing: false,
                });
              }}>Cancel</FlatButton>
            </form>
          </div>
        ) : (
          <div>
            <div>
              timestamp: {moment(timestamp).format('YYYY/MM/DD HH:mm:ss')}
            </div>
            <div>
              author: {author}
            </div>
            <div>
              body: {body}
            </div>
            <div>
              deleted: {deleted.toString()}
            </div>
            <div>
              parentDeleted: {parentDeleted.toString()}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton tooltip='up'>
                <KeyboardArrowUp />
              </IconButton>
              <div>
                <span style={{ fontSize: 24, margin: '0 5px' }}>{voteScore}</span>
                votes
              </div>
              <IconButton tooltip='down'>
                <KeyboardArrowDown />
              </IconButton>
            </div>
            <FlatButton onClick={(e) => {
              e.preventDefault();
              this.setState({
                editing: true,
              });
            }}>
              Edit
            </FlatButton>
            <FlatButton onClick={() => {
              if (window.confirm('Are you sure?')) {
                removeCommentAsync(id).then(() => history.push(match.url));
              }
            }}>
              Delete
            </FlatButton>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Comment);
