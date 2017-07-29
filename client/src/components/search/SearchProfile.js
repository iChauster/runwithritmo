import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getFullUser
} from '../../actions/actions';
import './Search.css'
//import { Button, FormControl, FormGroup } from 'react-bootstrap';

class SearchProfile extends Component {
  constructor(props) {
    super(props)
    

  }
  componentDidMount(){
    console.log('mounted')
    const { dispatch } = this.props;
    const username = this.props.match.params.username
    console.log("PROFILE : " + username)
    dispatch(getFullUser(username))
    
  }
  componentWillUnmount(){
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <div id="brand">
            <h1> @{this.props.match.params.username} </h1>
          </div>
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
  console.log(user)
  if(Object.keys(user).length === 0){
    return {undefined}
  }
  return { user }
}

export default connect(mapStateToProps)(SearchProfile);
