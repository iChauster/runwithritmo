import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './react-table.css'
import Modal from './Modal'
export default class Table extends Component{
    constructor(props) {
      console.log('constructor of table reached')
      super(props)
    }
    callModal(){
      this.mett()
    }
    mett = () => {}
    insertButton = (onClick) => {
      this.mett = onClick
      return(
        <div>
        </div>
      )
    }
    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable
    };
    return (
      <Modal { ... attr } />
    );
    }
  	render(){
  		const {data} = this.props
  		const options = {
        insertModal : this.createCustomModal,
        insertBtn : this.insertButton,
  			onRowClick: function(row) {
    			alert(`You click row id: ${row.id}`);
  			},
  			onRowDoubleClick: function(row) {
    			alert(`You double click row id: ${row.id}`);
  			}
		};
  		return (
  			<div className='runs'>
  				<BootstrapTable data={data} options={options} striped={false} hover={true} bordered={false} tableStyle={ { "padding": "6px" } } insertRow>
  					<TableHeaderColumn dataField="length" width='61%' isKey={true} dataAlign="left" dataSort={true}>Length</TableHeaderColumn>
  					<TableHeaderColumn dataField="time" width='13%' dataAlign="center" dataSort={true}>Time</TableHeaderColumn>
  					<TableHeaderColumn dataField="pace" width='13%' dataAlign="center">Pace</TableHeaderColumn>
            <TableHeaderColumn dataField="date" width='13%' dataAlign="center" dataSort={true}>Date</TableHeaderColumn>
  				</BootstrapTable>
          <div id="addRun" className='mdc-fab' onClick={this.callModal.bind(this)}>
            <h3 id="add"> + </h3>
          </div>
  			</div>
  		);
  	}
}

Table.propTypes = {
  dispatch : PropTypes.func.isRequired,
	data : PropTypes.arrayOf(
		PropTypes.object.isRequired
	).isRequired,

}
