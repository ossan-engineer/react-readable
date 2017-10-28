import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import HomeContainer from './Home/containers/HomeContainer';
import Categories from './Categories/components/Categories';
import PostDetail from '../components/PostDetail';

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
          <Route path='/posts/:id' component={PostDetail} />
          <Route path='/posts/:id/edit' component={PostDetail} />
          <Route path='/category/:category' component={Categories} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default Routes;
