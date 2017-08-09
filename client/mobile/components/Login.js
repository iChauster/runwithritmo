import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import {
  login
} from './../actions/actions'
import Button from 'react-native-button'
class Login extends Component {
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
    const loginInput = (<Hideo
          iconClass={FontAwesomeIcon}
          iconName={'user'}
          iconColor={'white'}
          style={styles.login}
          onChangeText={(text) => { 
            this.username = text
          }}
          // this is used as backgroundColor of icon container view.
          iconBackgroundColor={'#60A6AF'}
          inputStyle={{ color: '#464949' }}
        ></Hideo>)
    const passInput = (<Hideo
          iconClass={FontAwesomeIcon}
          iconName={'unlock-alt'}
          iconColor={'white'}
          onChangeText={(text) => { this.password = text }}
          style={styles.login}
          // this is used as backgroundColor of icon container view.
          iconBackgroundColor={'#60A6AF'}
          secureTextEntry={true}
          inputStyle={{ color: '#464949' }}
        ></Hideo>)
    return (
        <View style={styles.input}>
        <View style={styles.border}>
          <Text style={styles.brand}> Run with Rithvik </Text>
        </View>
        {loginInput}
        {passInput}
        <View style={styles.buttons}>
          <Button
            onPress={this.onLoginPress.bind(this)}
            style={
              {color:"#60A6AF",
              alignItems: 'center',
              justifyContent:"center"
              }
            }
            containerStyle={{padding:10, overflow:'hidden', borderColor: '#60A6AF', borderWidth: 2}}
          >Login</Button>
          <Button
            onPress={this.onRegisterPress}
            style={
              {color:"#737767",
              alignItems: 'center',
              justifyContent:"center"}
            }
            containerStyle={{padding:10, overflow:'hidden', borderColor: '#737767', borderWidth: 2}}
          >Register</Button>
        </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  brand:{
    fontSize:30,
    color:'#F4EDF1',
    fontFamily:"Avenir",
    padding:20,
    textAlign:"center"
  },
  border:{
    borderColor:"#F4EDF1",
    borderRadius:40,
    backgroundColor:"#2C2D31",
    borderWidth : 2,
  },
  input:{
    flex:1,
    backgroundColor: '#F4EDF1',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent:"center",
  },
  buttons:{
    paddingTop:30,
    paddingLeft:110,
    paddingRight:110,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'space-around',
  },
  login: {
    flex:0,
    paddingLeft:40,
    paddingRight:40,
    paddingTop:20,
  }
});

Login.PropTypes = {
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

export default connect(mapStateToProps)(Login)

