import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeContainer from './Home/containers/HomeContainer';
import Login, { fakeAuth } from './Login/components/Login';
import Connect from './Connect/components/Connect';

const Routes = () => (
  <BrowserRouter>
    <div style={{ textAlign: 'center' }}>
      <Link to='/'>
        <h1>React Readable</h1>
      </Link>
      <ul className='nav'>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            fakeAuth.deauthenticate();
            window.location.href = '/';
          }}
          >Logout</a>
        </li>
        <li>
          <Link to='/connect'>hoge</Link>
        </li>
      </ul>
      <hr />
      <Route exact path='/' component={HomeContainer} />
      <Route path='/login' component={Login} />
      <Route path='/connect' component={Connect} />
    </div>
  </BrowserRouter>
);

export default Routes;
