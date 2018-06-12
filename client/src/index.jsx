// Import dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Import components/containers
import { AppContainer } from './components/Containers';

// Import redux store
import store, { history } from './store';

// Import master CSS
// (For per-component CSS, css files are imported by component)
import './styles/master.css';

global.Raven.config(RAVEN_REACT_URI).install();

// Note: Ignoring ESLint suggestions for below React conventions.
render(
  <Provider store={store}>
    <BrowserRouter basename="/" history={history} >
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  global.document.getElementById('root'),
);

