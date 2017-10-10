import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import HomeContainer from '../containers/HomeContainer';
import Categories from '../components/Categories';
import Detail from '../components/PostDetail';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Link to='/'>
        <AppBar
          title='React Readable'
          showMenuIconButton={false}
          titleStyle={{ textAlign: 'center' }}
        />
      </Link>
      <div className='container-fluid'>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/posts/:id' component={Detail} />
          <Route path='/posts/:id/edit' component={Detail} />
          <Route path='/:category' component={Categories} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default Routes;
