import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import store from './redux/store';
import './stylesheets/index.scss';
import './firebase/app';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
