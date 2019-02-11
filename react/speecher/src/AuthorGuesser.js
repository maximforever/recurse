import React, {Component} from 'react';

class AuthorGuesser extends Component {

	renderButton(name){
		return <button className="author-button" onClick={() => this.props.handleClick(name)}>{name}</button>
	}


	render() {
		return (
			<div className = "author-guesser">
				<p>Nice job! now... can you guess the author?</p>
				{this.renderButton(this.props.options[0])}
				{this.renderButton(this.props.options[1])}
				{this.renderButton(this.props.options[2])}
				{this.renderButton(this.props.options[3])}
			</div>
		)
		
	}
}


export default AuthorGuesser;