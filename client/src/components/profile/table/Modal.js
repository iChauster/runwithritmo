import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import{
  addRun
} from '../../../actions/actions'
class Modal extends Component {
  constructor(props) {
    super(props)
    this.st = {}
  } 
  handleSaveBtnClick = () => {
    const { columns, onSave } = this.props;
    const newRow = {};
    newRow["length"] = this.st["length"].value;
    
    newRow["date"] = new Date();
    var seconds = parseInt(this.st["timeHour"].value, 10) * 60 * 60 + parseInt(this.st["timeMinute"].value, 10) * 60 + parseInt(this.st["timeSecond"].value, 10);
    var time = this.toHHMMSS(seconds)
    newRow["time"] = time
    var secondsPerMile = seconds / parseInt(this.st["length"].value, 10)
    var paceString = this.toHHMMSS(secondsPerMile);
    newRow["pace"] = paceString
    // You should call onSave function and give the new row
    onSave(newRow);

    var loc = navigator.geolocation;
    if(loc){
      loc.getCurrentPosition((position) => {
        var coordinates = position.coords;
        const { dispatch } = this.props;
        dispatch(addRun(newRow,coordinates));
      });
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
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    } = this.props;
    const errorLength = validateState["length"] ? (<span className='help-block bg-danger'>{ validateState["length"] }</span>) : null;
    const errorTime = validateState["time"] ? (<span className='help-block bg-danger'>{ validateState["time"] }</span>) : null;
    return (
      <div style={ { backgroundColor: '#F4EDF1', "borderRadius" : "0.4em" } } className='modal-content'>
        <h2 style={ { color: '#1f4f6a', "position": "relative", "textAlign": "center"  } }>Log a Run</h2>
        <div>
          
            <FormGroup key={ "length" }>
              <label>{ "Distance" } : </label>
              <FormControl inputRef={ref =>{this.st["length"] = ref}} placeholder={"Length"} />
              { errorLength }
            </FormGroup>
            
            <FormGroup key={ "time" }>
              <label>{ "Time" } : </label>
              <FormControl inputRef={ref =>{this.st["timeHour"] = ref}} placeholder={"Hours"} />
              { errorTime }
              <FormControl inputRef={ref =>{this.st["timeMinute"] = ref}} placeholder={"Minutes"} />
              { errorTime }
              <FormControl inputRef={ref =>{this.st["timeSecond"] = ref}} placeholder={"Seconds"} />
              { errorTime }
            </FormGroup>

            {
            /*
            columns.map((column, i) => {
              const {
                editable,
                format,
                field,
                name,
                hiddenOnInsert
              } = column;

              if (hiddenOnInsert) {
                // when you want same auto generate value
                // and not allow edit, for example ID field
                return null;
              }
              const error = validateState[field] ?
                (<span className='help-block bg-danger'>{ validateState[field] }</span>) :
                null;
              return (
                <FormGroup key={ field }>
                  <label>{ name } : </label>
                  <FormControl inputRef={ref =>{this.st[field] = ref}} placeholder={name} />
                  { error }
                </FormGroup>
              );
            })
            */
            }
        </div>
        <div>
          <Button onClick={ onModalClose } style={ {margin: "0.2em"} }>Cancel</Button>
          <Button style={{backgroundColor : "#3AD96E", "margin": "0.2em", "postion": "relative"}} onClick={ () => this.handleSaveBtnClick(columns, onSave) }>Save</Button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Modal);
