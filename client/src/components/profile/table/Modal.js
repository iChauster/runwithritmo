import React, { Component, PropTypes } from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.st = {}
  }
  handleSaveBtnClick = () => {
    const { columns, onSave } = this.props;
    const newRow = {};
    columns.forEach((column, i) => {
      newRow[column.field] = this.st[column.field].value;
    }, this);
    // You should call onSave function and give the new row
    onSave(newRow);
    //TODO : implement save to server by dispatch
  }

  render() {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    } = this.props;
    return (
      <div style={ { backgroundColor: '#F4EDF1', "borderRadius" : "0.4em" } } className='modal-content'>
        <h2 style={ { color: '#1f4f6a', "position": "relative", "text-align": "center"  } }>Log a Run</h2>
        <div>
          {
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