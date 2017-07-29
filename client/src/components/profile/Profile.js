/*global google*/
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './Profile.css';
//import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/visualization/HeatmapLayer";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import '@material/fab/dist/mdc.fab.css'
import Table from './table/Table'

class Profile extends Component {
  constructor(props) {
    console.log('constructor of profile reached')
    super(props)
    
  }
  getData(google){
    const {
      profile
    } = this.props
    var arr = profile.runs;
    var locations = [];
    for (var obj in arr) {
      var location = arr[obj].subpoints[0]
      var imp = new google.maps.LatLng(location.latitude, location.longitude);
      locations.push(imp);
    }
    return locations
  }
  render() {
    const {
      profile,
    } = this.props
   	const GettingStartedGoogleMap=withScriptjs(
  	withGoogleMap(
  		props => (
  			<GoogleMap
  				ref={props.onMapLoad}
  				defaultZoom={18}
  				defaultCenter={{lat: 40.35, lng: -74.66}}
  				onClick={props.onMapClick}>
          <HeatmapLayer 
            data={this.getData(google)}> </HeatmapLayer>
  			</GoogleMap>
  			)
  		));
    return (
    	<div>
    	<GettingStartedGoogleMap
  		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAz5AiYQrWAfsSpOt7Q-Ap1YkI4ptIkgVM&libraries=visualization"
  		loadingElement={
      		<div style={{ width: `100%`, height: `70%`}}></div>
    	}
  		containerElement={
  			<div style={{ width: `100%`, height: `90%` }}></div>
  		}
  		mapElement={
  			<div style={{ width: `100%`, height: `100%` }}></div>
  		}
  		markers={this.markers}>
	    </GettingStartedGoogleMap>
      <Table
        data={profile.runs}/>
    	</div>
    	);
    }
  }
Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Profile);
