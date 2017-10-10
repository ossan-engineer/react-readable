import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Connect.css';

const Connect = ({ match }) => (
  <div>
    <h2>Connect</h2>
    <ul className='nav'>
      <li>
        <Link to={`${match.url}/register`}>入力</Link>
      </li>
      <li>
        <Link to={`${match.url}/completed`}>完了</Link>
      </li>
    </ul>
    <hr />
    <Route
      path={`${match.path}/register`}
      render={() => (
        <div>Register</div>
      )}
    />
    <Route
      path={`${match.path}/completed`}
      render={() => (
        <div>Completed</div>
      )}
    />
  </div>
);

export default Connect;
