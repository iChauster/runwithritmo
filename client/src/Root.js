import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';
import App from './components/app/App';


const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route exact path="/" component={App} />
      </div>
   </HashRouter >
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
