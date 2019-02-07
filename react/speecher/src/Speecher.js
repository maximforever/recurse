import React, { Component } from 'react';

import Gameboard from './Gameboard'
import InputForm from './InputForm'


class Speecher extends Component {

  	constructor(props){
    	super(props);
    	let randomQuote = this.selectRandomQuote();
    	this.state = {
      		currentGuess: "",
     		answer: randomQuote,
     		answerWords: randomQuote.body.split(" "),
     		guessedWords: this.stripPunctuation(randomQuote.body)
    	}
  	}


  	takeAGuess = (event) =>  {

  		let guess = event.target.value;

  		if(!this.state.guessedWords.includes(guess) && this.state.answerWords.includes(guess)){
  			let guessedWords = this.state.guessedWords.slice();
  			guessedWords.push(guess);

  			this.setState({
  				guessedWords: guessedWords,
  				currentGuess: ""
  			})
  		} else {

	  		this.setState({
	      		currentGuess: guess
	    	})
  		}



    	
  	}

  	stripPunctuation(quote){
  		let quoteArray = quote.split(" ");
  		let chars = "-,?!";
  		let charArray =  chars.split("");

  		return quoteArray.filter((word) => {
  			return charArray.includes(word)
  		})
  	}

  	selectRandomQuote(){
    	return quoteLibrary[Math.floor((Math.random()*quoteLibrary.length))]
  	}


	render(){

		return(
			<div className="speecher">
				<h1>Speech Guesser</h1>
				<p>{this.state.answer.body}</p>
				
				<Gameboard 
					answerWords={this.state.answerWords} 
					guessedWords={this.state.guessedWords} 
				/>
				
				<InputForm 
					value={this.state.currentGuess} 
					handleInput={this.takeAGuess} 
				/>

				
			</div>
		);
	}

}



// some seed quotes for testing

let quoteLibrary = [
  {
    body: "In three words I can sum up everything I've learned about life: it goes on",
    author: "Robert Frost"
  },
  {
    body: "The irony of commitment is that it's deeply liberating - in work, in play, in love",
    author: "Anne Morris"
  },

  {
    body: "Do what you feel in your heart to be right - for you'll be criticized anyway.",
    author: "Eleanor Roosevelt"
  },

  {
    body: "Life is a succession of lessons which must be lived to be understood",
    author: "Ralph Waldo Emerson"
  }
]


export default Speecher;