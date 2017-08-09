import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import Root from './components/Root'
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)
 export default App
