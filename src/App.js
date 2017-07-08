import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {date : new Date(), callIt : this.method()}
  }
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  method(){
    console.log('clicked')
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Run With Rithvik</h2>
          <h2>It is {this.state.date.toLocaleTimeString()}. </h2>
          <h2>Time to run.</h2>
        </div>
        <div className="App-intro">
          <FormGroup>
          <FormControl placeholder = "Username" inputRef={ref => {
            this.input = ref;
          }} />
          </FormGroup>
          <FormGroup>
          <FormControl placeholder = "Password"inputRef={ref => {
            this.input = ref;
          }} />
          </FormGroup>
          <div className = "buttons">
            <div className = "spacing">
            <Button id = "login" bsStyle="success" bsSize="medium" onClick={this.method}>
              Login
            </Button>
            </div>
            <div className = "spacing">
            <Button id = "register" bsStyle="success" bsSize="medium" onClick={this.method}>
              Register
            </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
