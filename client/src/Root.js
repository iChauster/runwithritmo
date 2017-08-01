import React, {PropTypes} from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './components/app/App';
import SearchProfile from './components/search/SearchProfile'
import PersonalProfile from './components/profile/PersonalProfile'


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/search/:username" component={SearchProfile} />
        <Route path="/profile" component={PersonalProfile} />
      </div>
   </Router >
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
