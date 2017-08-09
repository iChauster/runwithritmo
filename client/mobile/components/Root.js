import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View } from 'react-native';
import Login from './Login.js'
import {
  login
} from './../actions/actions'
import Button from 'react-native-button'
class Root extends Component {
  componentDidMount(){

  }
  onLoginPress(){
    console.log('login')
    console.log(this.username)
    console.log(this.password)
    const {dispatch} = this.props
    dispatch(login(this.username,this.password))
  }
  onRegisterPress(){
    console.log('register')
  }
  render() {
    const {user} = this.props
    return(
      <View style={styles.container}>
      {user === undefined &&
        <Login />
      }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:"center",
  }
});

Root.PropTypes = {
  dispatch: PropTypes.func.isRequired,
}
function mapStateToProps(state){
  const {loginReducer} = state
  const {user} = loginReducer
  if(Object.keys(user).length === 0){
    return {undefined}
  }
  return {user}
}

export default connect(mapStateToProps)(Root)

