import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
       editing: false
    }
  }

  render() {
    const {timestamp, author, body, voteScore} = this.props;

    return (
      <div>
        {this.state.editing ? (
          <div>
            <form>
              <div>
                timestamp: <input type='text' name='timestamp' value={timestamp} />
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
              timestamp: {timestamp}
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
            <a href="#" onClick={(e) => {
              e.preventDefault();
              this.setState({
                editing: true,
              });
            }}>
              Edit
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default Comment;
