import React, {Component} from 'react';

class Word extends Component {

	render() {
		return (
			<div className="one-word"> { this.props.word } </div>
		)
	}

}


export default Word