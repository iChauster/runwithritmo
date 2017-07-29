import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getFullUser
} from '../../actions/actions';
import './Search.css'
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart
} from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

import {Col} from 'react-bootstrap';

class SearchProfile extends Component {
  constructor(props){
    super(props);
    this.state = { width: '0', height: '0' };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount(){
    console.log('mounted')
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const { dispatch } = this.props;
    const username = this.props.match.params.username
    console.log("PROFILE : " + username)
    dispatch(getFullUser(username))    
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  calculateTotalRuns(){
    return this.runs.length
  }
  calculateTotalDistance(){
    var sum = 0
    this.runs.forEach((element, index) => {
      sum += element.length;
    }, this);
    return sum;
  }
  calculateFastestPace(){
    
  }
  render() {
    const {
      user
    } = this.props
    if(user != null){
      var pointsArray = []
      this.runs = user.runs
      user.runs.forEach((element, index) => {
        var runDataArray = []
        runDataArray.push(Date.parse(element.date))
        runDataArray.push(element.length)
        pointsArray.push(runDataArray)
      }, this);
      const data = {
        "name" : 'Miles v Time',
        "columns" : ["time", "value"],
        "points" : pointsArray
      };
      console.log(data)
      const timeSeries = new TimeSeries(data)
      this.ts = timeSeries
      this.distance = this.calculateTotalDistance()
      this.totalRuns = this.calculateTotalRuns()
      console.log(this.ts)
    }
    return (
      <div className="App">
        <div className="header">
          <div id="brand">
            <h1> @{this.props.match.params.username} </h1>
          </div>
        </div>
        <div className="chart">
          {user !== undefined &&
            <ChartContainer timeRange={this.ts.timerange()} width={this.state.width-40}>
                <ChartRow height={this.state.height * .4}>
                    <YAxis id="y" label="Miles" min={this.ts.min() - 10} max={this.ts.max() + 10}/>
                    <Charts>
                        <LineChart axis="y" series={this.ts}/>
                    </Charts>
                </ChartRow>
            </ChartContainer>
          }
        </div>
        <Col xs={4} md={4}>
          <h1> Total Runs </h1>
          <div className="box">
            <h2> {this.totalRuns} </h2>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <h1> Total Distance </h1>
          <div className="box">
            <h2> {this.distance} miles</h2>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <h1> Pace </h1>
          <div className="box">
            
          </div>
        </Col>
      </div>
    );
  }
}

SearchProfile.propTypes = {
  dispatch: PropTypes.func.isRequired 
}
function mapStateToProps(state) {
  const {loginReducer} = state
  const {user} = loginReducer
  if(Object.keys(user).length === 0){
    return {undefined}
  }
  return { user }
}

export default connect(mapStateToProps)(SearchProfile);
