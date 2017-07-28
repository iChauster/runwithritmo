import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  getFullUser
} from '../../actions/actions';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

class SearchProfile extends Component {
  constructor(props) {
    super(props)
    console.log(props);
  }
  componentDidMount(){
    console.log('mounted')
    const { dispatch } = this.props;
    
  }
  componentWillUnmount(){
  }
  render() {
    return (
      <div className="App">
        <h1> search </h1>
      </div>
    );
  }
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
