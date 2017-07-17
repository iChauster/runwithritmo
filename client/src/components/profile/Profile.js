import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './Profile.css';
//import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import '@material/fab/dist/mdc.fab.css'
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
  add(){
    console.log('add clicked')
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
          {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
      ))}
  			</GoogleMap>
  			)
  		));
    return (
    	<div>
    	<GettingStartedGoogleMap
  		googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAz5AiYQrWAfsSpOt7Q-Ap1YkI4ptIkgVM"
  		loadingElement={
      		<div style={{ width: `100%`, height: `70%`}}></div>
    	}
  		containerElement={
  			<div style={{ width: `100%`, height: `90%` }}></div>
  		}
  		mapElement={
  			<div style={{ width: `100%`, height: `100%` }}></div>
  		}
  		markers={[{ position: {
        lat: 40.35,
        lng: -74.66,
        key: 'Lewis Library'}
    	}]}>
	    </GettingStartedGoogleMap>
      <div className='runs'>
        <h1>helo</h1>
        <div id="addRun" className='mdc-fab' onClick={this.add.bind(this)}>
          <h3 id="add"> + </h3>
        </div>
      </div>
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
