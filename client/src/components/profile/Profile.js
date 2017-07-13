import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
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
    return (
      <h2> hello {profile.username}, get started! </h2>
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
