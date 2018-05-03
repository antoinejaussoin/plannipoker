import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Store from './store';
import SocketIo from './store/socket';
import Api from './store/api';
import 'whatwg-fetch';
import './global-styles';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

configure({
  enforceActions: true
});

const store = new Store(new SocketIo(), new Api());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
