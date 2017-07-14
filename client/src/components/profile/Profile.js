import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
<<<<<<< HEAD
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
=======
>>>>>>> 9e44fd7cf52ba7052bc5cedde935740ee59a1565
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
<<<<<<< HEAD

=======
>>>>>>> 9e44fd7cf52ba7052bc5cedde935740ee59a1565
  render() {
    const {
      profile,
    } = this.props
<<<<<<< HEAD
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
=======
    return (
      <div>
      <h2> hello {profile.username}, get started! </h2>
      <h3> fuck off </h3>
      </div>
    );
  }
>>>>>>> 9e44fd7cf52ba7052bc5cedde935740ee59a1565
}
Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {}
}

<<<<<<< HEAD
export default connect(mapStateToProps)(Profile);
=======
export default connect(mapStateToProps)(Profile);
>>>>>>> 9e44fd7cf52ba7052bc5cedde935740ee59a1565
