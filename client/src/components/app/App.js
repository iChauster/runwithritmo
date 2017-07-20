import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './App.css';
import {
  initialize,
  login,
  register
} from '../../actions/actions';
import Profile from '../profile/Profile';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { WeatherWidget } from 'react-native-weather';

class App extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {date : new Date()}
  }
  componentDidMount(){
    console.log('mounted')
    const { dispatch } = this.props;
    dispatch(initialize())
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  handleLoginClick(){
    console.log('clicked');
    var username = this.loginInput.value;
    var password = this.passInput.value;
    if (username !== "" && password !== "") {
          console.log(this.loginInput.value);
          console.log(this.passInput.value)
          this.props.dispatch(login(username,password))
    }else{
      alert('Please enter a username and password!');
    }
  }
  handleRegisterClick(){
    console.log('register clicked');
    var username = this.loginInput.value
    var password = this.passInput.value;
    if(username !== "" && password !== ""){
      this.props.dispatch(register(username,password))
    }else{
      alert('Please enter a username and password!');
    }
  }
  render() {
    const {
      user,
    } = this.props;
    return (
      <div className="App">
        {user === undefined &&
        <div className="video-wrap">
          <div className="layer"></div>
          <video id="cover" className="video" src={require("../../../public/run.mp4")} autoPlay loop muted>
          </video>
        </div>
        }
        <div className="App-header">
          <div id="brand">
            <h2>ReddySetRun</h2>
            {user !== undefined &&
              <h3>Hello {user.username}! </h3>
            }
          </div>
          <WeatherWidget
            api={"https://api.darksky.net/forecast/0c802e6fca0ccdc2bdd45cc2748bb8dc/40.35,-74.66"}
            lat={"lat"}
            lng={"lng"}
            location={"location"}
          />
        </div>
        {user !== undefined &&
            <Profile 
              profile={user}
            />
        }
        {user === undefined &&
        <div className="max">
        <div className="App-intro">
          <FormGroup>
          <FormControl placeholder="Username" inputRef={ref => {
            this.loginInput=ref;
          }} />
          </FormGroup>
          <FormGroup>
          <FormControl placeholder="Password"inputRef={ref => {
            this.passInput=ref;
          }} />
          </FormGroup>
          <div className="buttons">
            <div className="spacing">
            <Button id="login" bsStyle="success" onClick={this.handleLoginClick.bind(this)}>
              Login
            </Button>
            </div>
            <div className="spacing">
            <Button id="register" bsStyle="success" onClick={this.handleRegisterClick.bind(this)}>
              Register
            </Button>
            </div>
          </div>
        </div>
        </div>
        }
      </div>
    );
  }
}
App.propTypes = {
  user : PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  const {loginReducer} = state
  const {user} = loginReducer
  console.log(user)
  if(Object.keys(user).length === 0){
    return {undefined}
  }
  return { user }
}

export default connect(mapStateToProps)(App);
