import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class Table extends Component{
	add(){
    	console.log('add clicked')
  	}
	render(){
		const {} = this.props
		return (
			<div className='runs'>
				<h1>helo</h1>
				<div id="addRun" className='mdc-fab' onClick={this.add.bind(this)}>
					<h3 id="add"> + </h3>
				</div>
			</div>
		);
	}
}
/*
Table.propTypes = {
	data : PropTypes.arrayOf(
		PropTypes.object.isRequired
	).isRequired,
}
*/