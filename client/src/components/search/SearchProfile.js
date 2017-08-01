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
import {
  SVGRuns,
  SVGDistance,
  SVGPace,
  SVGIndicator,
} from './svg.js'
import SwipeableViews from 'react-swipeable-views'
import { TimeSeries } from "pondjs";
const dateFormat = require('dateformat')
import {Col} from 'react-bootstrap';

class SearchProfile extends Component {
  constructor(props){
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    dateFormat.masks.smoothDate = 'm.d.yy';
  }
  componentDidMount(){
    console.log('mounted')
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const { dispatch, profile } = this.props;
    console.log(this.props)
    var username;
    if(!profile){
      username = this.props.match.params.username
    }else{
      username = profile.username
    }
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
  calculateAverageDistance(){
    var totalDistance = this.calculateTotalDistance();
    var runs = this.calculateTotalRuns();
    return Math.floor(totalDistance / runs * 100) / 100.0;
  }
  calculateLongestDistance(){
    var max = 0;
    this.runs.forEach((element, index) => {
      if(element.length > 0){
        max = element.length
      }
    }, this);
    return max;
  }
  calculateAveragePace(){
    var sum = 0;
    this.runs.forEach((element, index) => {
      var seconds = element.pace.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)
      sum += seconds
    });
    var average = sum / this.calculateTotalRuns();
    return this.toHHMMSS(average)
  }
  calculateFastestPace(){
    var min = Number.MAX_VALUE;
    this.runs.forEach((element, index) => {
      var seconds = element.pace.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)
      if(min > seconds){
        min = seconds
      }
    });
    return this.toHHMMSS(min)
  }
  calculatePaceImprovement(){
    if(this.runs.length > 1){
      var latestRunPace = this.runs[this.runs.length - 1].pace
      //in the future, get the averages of the last few runs instead of last run
      var controlPace = this.runs[this.runs.length - 2].pace
      var latestSeconds = latestRunPace.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)
      var controlSeconds = controlPace.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)
      var difference = latestSeconds - controlSeconds;
      console.log(difference);
      return difference
    }
  }
  toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)    
    var hours   = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60    
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
  }
  render() {
    const {
      user,
      profile
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
      this.lastRun = dateFormat(new Date(user.runs[user.runs.length - 1].date), "smoothDate");
      const data = {
        "name" : 'Miles v Time',
        "columns" : ["time", "value"],
        "points" : pointsArray
      };
      console.log(data)
      const timeSeries = new TimeSeries(data)
      this.ts = timeSeries
      console.log(this.ts)
    }
    return (
      <div className="App">
        <div className="header">
          <div id="brand">
            {profile === undefined &&
            <h1> @{this.props.match.params.username} </h1>
            }
            {profile !== undefined &&
            <h1> @{profile.username} </h1>
            }
          </div>
        </div>
        {user !== undefined &&
        <div className="chart">
            <ChartContainer timeRange={this.ts.timerange()} width={this.state.width-40}>
                <ChartRow height={this.state.height * .4}>
                    <YAxis id="y" label="Miles" min={this.ts.min() - 10} max={this.ts.max() + 10}/>
                    <Charts>
                        <LineChart axis="y" series={this.ts}/>
                    </Charts>
                </ChartRow>
            </ChartContainer>
        </div>
        }
        {user !== undefined &&
        <SwipeableViews enableMouseEvents>
        <div>
        <div className="icon">
        < SVGRuns />
        </div>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Last Run </h1>
            <h2> {this.lastRun} </h2>
            </div>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Total Runs </h1>
            <h2> {this.calculateTotalRuns()} </h2>
            </div>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Streak </h1>
            <h2> 0 </h2>
            </div>
          </div>
        </Col>
        </div>
        <div>
        <div className="icon">
        < SVGDistance />
        </div>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Total Distance </h1>
            <h2> {this.calculateTotalDistance()} mi.</h2>
            </div>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Average Distance </h1>
            <h2> {this.calculateAverageDistance()} mi.</h2>
            </div>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Longest Distance </h1>
            <h2> {this.calculateLongestDistance()} mi.</h2>
            </div>
          </div>
        </Col>
        </div>
        <div>
        <div className="icon">
        < SVGPace />
        </div>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Fastest Pace </h1>
            <h2> {this.calculateFastestPace()} </h2>
            </div>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Average Pace </h1>
            <h2> {this.calculateAveragePace()} </h2>
            </div>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="box">
            <div className="center">
            <h1> Pace Improvement</h1>
            <div className='inlineb'>
              <div id="indicator">
                {SVGIndicator(this.calculatePaceImprovement())} 
              </div>
              <h2 className="inlineb"> 
                {this.toHHMMSS(Math.abs(this.calculatePaceImprovement()))} 
              </h2>
            </div>
            
            </div>
          </div>
        </Col>
        </div>
        </SwipeableViews>
        }
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
