import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Store from './store';
import 'whatwg-fetch';
import './global-styles';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
