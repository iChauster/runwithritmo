import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './components/App';

const store = configureStore();

export default class Root extends Component {
	componentDidMount(){
    console.log('mounted');
    
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}