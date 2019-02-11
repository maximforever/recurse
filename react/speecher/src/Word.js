import React, {Component} from 'react';

class Word extends Component {

	render() {

		let styling = this.props.word.includes("_") ? "one-word" : "one-word guessed"

		return (
			<div className={styling} onClick={this.props.handleClick}> { this.props.word } </div>
		)
	}

}


export default Word