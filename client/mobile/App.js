import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import Button from 'react-native-button'
export default class App extends React.Component {
  componentDidMount(){

  }
  onLoginPress(){
    console.log('login')
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
          // this is used as backgroundColor of icon container view.
          iconBackgroundColor={'#60A6AF'}
          inputStyle={{ color: '#464949' }}
        ></Hideo>)
    const passInput = (<Hideo
          iconClass={FontAwesomeIcon}
          iconName={'unlock-alt'}
          iconColor={'white'}
          style={styles.login}
          // this is used as backgroundColor of icon container view.
          iconBackgroundColor={'#60A6AF'}
          inputStyle={{ color: '#464949' }}
        ></Hideo>)
    return (
      <View style={styles.container}>
        <View style={styles.input}>
        <View style={styles.border}>
          <Text style={styles.brand}> Run with Rithvik </Text>
        </View>
        {loginInput}
        {passInput}
        <View style={styles.buttons}>
          <Button
            onPress={this.onLoginPress}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:"center",
  },
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
