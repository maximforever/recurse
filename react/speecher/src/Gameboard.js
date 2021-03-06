import React, { Component } from 'react';
import Word from "./Word"


class Gameboard extends Component {

	

	render() {

		let displayWords = [];

		for(var i = 0; i < this.props.answerWords.length; i++){

			let word = this.props.answerWords[i];

			if (this.props.remainingWords.includes(word)){
				let emptyWord = {
					display: word.replace(/./g, "_"),
					actualWord: word
				}
				displayWords.push(emptyWord);
			} else {
				let guessedWord = {
					display: word,
					actualWord: word
				}
				displayWords.push(guessedWord);
			}
		}

		//console.log(displayWords);

		return(

			<div className="game-board">
				
				<div className="category">Category: {this.props.category.toUpperCase()}</div>

				<div className="money">You have <span className="money-count">${this.props.money}</span></div>
				
				<div className="rules">
					You get $100 for each letter in a word you guess correctly.
					<br/>Click on a word to buy it for $100/letter. 
				</div>

				<div className="game-board-wrapper">
					{displayWords.map((word, idx) => {
						return (<Word key={idx} handleClick={() => this.props.buyWord(word.actualWord)} word={word.display} />)
					})}
				</div>
			</div>

		)
	}
}

export default Gameboard;
