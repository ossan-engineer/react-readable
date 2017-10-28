import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
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
    const {parentId, timestamp, author, body, voteScore, deleted, parentDeleted} = this.props;

    return (
      <div>
        {this.state.editing ? (
          <div>
            <form>
              <div>
                parentId: {parentId}
              </div>
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
                voteStore: <input type='text' name='voteScore' value={voteScore} />
              </div>
              <div>
                deleted: {deleted.toString()}
              </div>
              <div>
                parentDeleted: {parentDeleted.toString()}
              </div>
              <input type='submit' value='Save' />
              <button onClick={() => {
                this.setState({
                  editing: false,
                });
              }}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <div>
              parentId: {parentId}
            </div>
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
              voteStore: {voteScore}
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
            <a href="#" onClick={(e) => {
              e.preventDefault();
              this.setState({
                editing: true,
              });
            }}>
              Edit
            </a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
            }}>
              Delete
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default Comment;
