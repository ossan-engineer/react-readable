import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import HomeContainer from './Home/containers/HomeContainer';
import Category from './Category/components/Category';
import PostDetailContainer from './Posts/containers/PostDetailContainer';
import NotFound from './NotFound/components/NotFound';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Link to='/'>
        <AppBar
          title='React Readable'
          showMenuIconButton={false}
          titleStyle={{ textAlign: 'center' }}
          style={{ backgroundColor: '#000' }}
        />
      </Link>
      <div className='container-fluid'>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/posts/:id' component={PostDetailContainer} />
          <Route path='/posts/:id/edit' component={PostDetailContainer} />
          <Route path='/category/:category' component={Category} />
          <Route path='/error' component={NotFound}></Route>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default Routes;
