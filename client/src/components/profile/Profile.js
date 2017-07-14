import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
class Profile extends Component {
  constructor(props) {
    console.log('constructor of profile reached')
    super(props)
  }
  componentDidMount(){
    console.log('mounted Profile')
  }
  componentWillUnmount(){
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
  				defaultZoom={6}
  				defaultCenter={{lat: 40.35, lng: -74.66}}
  				onClick={props.onMapClick}>
  			</GoogleMap>
  			)
  		));
    return (
    	<div>
    	<h2>Hello {profile.username}, lets get started! </h2>
    	<h3> Your Runs </h3>
    	<GettingStartedGoogleMap
  		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAz5AiYQrWAfsSpOt7Q-Ap1YkI4ptIkgVM"
  		loadingElement={
      		<div style={{ width: `100%` },{height: `25em`}}></div>
    	}
  		containerElement={
  			<div style={{ width: `100%` },{height: `25em`}}></div>
  		}
  		mapElement={
  			<div style={{ width: `100%` },{height: `25em`}}></div>
  		}
  		markers={[{ position: {
        lat: 40.35,
        lng: -74.66,}
    	}]}>
	    </GettingStartedGoogleMap>
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
