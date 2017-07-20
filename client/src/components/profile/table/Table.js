import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './react-table.css'
import Modal from './Modal'
export default class Table extends Component{
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
  		const {} = this.props
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
  		var products = [{
  			distance: "3.3 miles",
  			time: "15m 23s",
  			pace: "5:12",
        id : 1,
        date: "6/7/17"
  		},{
  			distance: "0.9 miles",
  			time: "4m 23s",
  			pace: "3:12",
        id : 2,
        date: "5/10/17"
  		}];
		// It's a data format example.
  		return (
  			<div className='runs'>
  				<BootstrapTable data={products} options={options} striped={false} hover={true} bordered={false} tableStyle={ { "padding": "6px" } } insertRow>
  					<TableHeaderColumn dataField="distance" width='61%' isKey={true} dataAlign="left" dataSort={true}>Distance</TableHeaderColumn>
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
