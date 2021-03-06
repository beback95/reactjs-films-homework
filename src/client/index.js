import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'containers/App/App';

import configureStore from './store/configureStore';

const root = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={ configureStore() }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    root,
  );
};

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept(() => { render(); });
}

render();
