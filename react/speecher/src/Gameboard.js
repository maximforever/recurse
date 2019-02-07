import React, { Component } from 'react';
import Word from "./Word"


class Gameboard extends Component {

	

	render() {

		let displayWords = [];

		for(var i = 0; i < this.props.answerWords.length; i++){

			let word = this.props.answerWords[i];
			

			if (!this.props.guessedWords.includes(word)){

				let emptyWord = word.replace(/./g, ".");
				displayWords.push(emptyWord)
			} else {
				displayWords.push(word)
			}
		}

		return(

			<div className="game-board">
				{displayWords.map((word) => {
					let chars = "1234567890";
					let id = "";

					for(let i = 0; i < 8; i++){
						id += chars[Math.floor(Math.random()*chars.length)];
					}

					return (<Word key={id} word={word} />)
				})}
			</div>

		)
	}
}

export default Gameboard;