import React, { Component } from 'react';

class InputForm extends Component {





	render(){

		return (
			<div className="input-form">
				<input value={this.props.value} placeholder = "take a guess..." onChange={this.props.handleInput} />
			</div>
		)
	}

}

export default InputForm;