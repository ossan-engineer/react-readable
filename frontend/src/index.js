import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import store from './store/store';
import Routes from './routes/';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
