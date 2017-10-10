import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Home from '../components/Home';
import Category from '../components/Categories';
import Detail from '../components/PostDetail';

const Routes = () => (
  <BrowserRouter>
    <div>
      <h1>
        <Link to='/'>
          React Readable
        </Link>
      </h1>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/posts/:id' component={Detail} />
        <Route path='/posts/:id/edit' component={Detail} />
        <Route path='/:category' component={Category} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
