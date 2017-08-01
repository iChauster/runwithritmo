import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
//import { Button, FormControl, FormGroup } from 'react-bootstrap';
import SearchProfile from './../search/SearchProfile'
import {
	initialize
} from './../../actions/actions'

class PersonalProfile extends Component {
  constructor(props) {
    console.log('constructor of profile reached')
    super(props)
    const {dispatch} = this.props;
    dispatch(initialize())
  }
  
  render() {
  	const {user} = this.props
    return (
    	<div>
	    	{user !== undefined &&
	    		<SearchProfile profile={user}/>
	    	}
    	</div>
    )
  }
}

PersonalProfile.propTypes = {
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

export default connect(mapStateToProps)(PersonalProfile);