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

//import { Button, FormControl, FormGroup } from 'react-bootstrap';

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
  render() {
    const {
      user
    } = this.props
    if(user != null){
      var pointsArray = []
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
                <ChartRow height="200">
                    <YAxis id="y" label="Miles" min={this.ts.min() - 10} max={this.ts.max() + 10}/>
                    <Charts>
                        <LineChart axis="y" series={this.ts}/>
                    </Charts>
                </ChartRow>
            </ChartContainer>
          }
        </div>
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
