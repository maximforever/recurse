import React, { Component } from 'react';

import Gameboard from './Gameboard'
import InputForm from './InputForm'
import AuthorGuesser from './AuthorGuesser'


class Speecher extends Component {

  	constructor(props){
    	super(props);
    	let randomQuote = this.selectRandomQuote();
    	this.state = {
    		money: 1000,
    		allWordsGuessed: false,
    		authorGuessed: false,
      		currentGuess: "",
     		answer: randomQuote,
     		answerWords: randomQuote.body.split(" "),
     		remainingWords: this.stripPunctuation(randomQuote.body)
    	}
  	}


  	takeAGuess = (event) =>  {

  		let guess = event.target.value.trim();

  		if(this.state.remainingWords.includes(guess) && this.state.answerWords.includes(guess)){
  			// used guessed a word!
  			let remainingWords = this.state.remainingWords.slice();
  			
  			remainingWords = remainingWords.filter((word) => {
  				return word !== guess
  			});

  			let allWordsGuessed = (remainingWords.length) ? false : true;
  			let newMoneyBalance = this.state.money + guess.trim().length * 100;

  			this.setState({
  				remainingWords: remainingWords,
  				currentGuess: "",
  				allWordsGuessed: allWordsGuessed,
  				money: newMoneyBalance
  			})
  		} else {

	  		this.setState({
	      		currentGuess: guess
	    	})
  		}



    	
  	}

  	stripPunctuation(quote){
  		let quoteArray = quote.split(" ");
  		let chars = ".-,:?!";
  		let charArray =  chars.split("");

  		return quoteArray.filter((word) => {
  			return !charArray.includes(word)
  		})
  	}

  	selectRandomQuote(){
    	return quoteLibrary[Math.floor((Math.random()*quoteLibrary.length))]
  	}

  	prepareAnswers(answer, array, numberOfChoices){

  		if(numberOfChoices > (array + 1)){
  			console.log("Can't have more choices than options");
  			return null;
  		}

  		let incorrectChoices = array.slice();			// make a copy of the array so we don't mutate the state
  		let correctAnswerIndex = Math.floor(Math.random() * numberOfChoices);

  		let selectedAnswers = [];

  		for(let i = 0; i < numberOfChoices; i++){
  			if(i === correctAnswerIndex){
  				selectedAnswers.push(answer);
  			} else {
  				let randomAnswerIndex = Math.floor(Math.random() * incorrectChoices.length);
  				selectedAnswers.push(incorrectChoices[randomAnswerIndex]);
  				incorrectChoices.splice(randomAnswerIndex, 1);		// remove choice from array
  			}
  		}



  		return selectedAnswers;
  	}

  	buyWord(word){
  		if(this.state.money >= word.length * 100 && this.state.remainingWords.includes(word)){

  			let newMoneyBalance = this.state.money - word.length * 100;
  			let newRemainingWords = this.state.remainingWords.filter((remainingWord) => {
  				return remainingWord !== word
  			});


  			this.setState({
  				money: newMoneyBalance,
  				remainingWords: newRemainingWords
  			})

  		}
  	}

  	guessAuthor = (name) => {
  		console.log(this.state.answer.author);
  		console.log(name);
  		if(this.state.answer.author === name){
  			console.log("Yay, that's right!");
  			this.setState({
  				authorGuessed: true
  			})
  		}
  	}

  	renderGameboard(){
  		return(<Gameboard 
			money={this.state.money} 
			answerWords={this.state.answerWords} 
			remainingWords={this.state.remainingWords} 
			buyWord={(word) => this.buyWord(word)}
		/>)
  	}

  	renderQuoteGuess(){
  		return(
  			<InputForm 
				value={this.state.currentGuess} 
				handleInput={this.takeAGuess} 
			/>
  		)
  	}

  	renderAuthorGuess(){
  		let otherAnswers = ["Arnold Schwarzenegger", "Ghandi", "JK Rowling", "Desmond Tutu", "Barack Obama", "Nelson Mandela", "Albert Einstein"];
  		let numberOfChoices = 4;
  		let shuffledAnswers = this.prepareAnswers(this.state.answer.author, otherAnswers, numberOfChoices);

  		return(
  			<AuthorGuesser options={shuffledAnswers} handleClick={(name) => this.guessAuthor(name)}/>
  		)
  	}

  	renderVictoryMessage(){
  		return(
  			<div className="victory-message">
	  			<h1>
	  				<i class="fas fa-star"></i>
	  				<i class="fas fa-star"></i>
	  				<i class="fas fa-star"></i>
	  				<div className="victory-message-hooray">You got it!</div>
	  			</h1>
	  			
	  			<div className="quote-wrapper">
	  				<h3 className="quote">{this.state.answer.body}</h3>
	  				<h4 className="quote-author">~ {this.state.answer.author}</h4>
	  			</div>
	  		</div>
  		)
  	}


	render(){

		let gameboard = (!this.state.authorGuessed) ? this.renderGameboard() : null;
		let guessInput = (!this.state.allWordsGuessed && !this.state.authorGuessed) ? this.renderQuoteGuess() : null;
		let authorGuessSection = (this.state.allWordsGuessed && !this.state.authorGuessed) ? this.renderAuthorGuess() : null;
		let victoryMessage = (this.state.allWordsGuessed && this.state.authorGuessed) ? this.renderVictoryMessage() : null;

		return(
			<div className="speecher">
				<h1><i className="fas fa-microphone-alt"></i> Speecher</h1>
				{/*<p>{this.state.answer.body}</p>*/}
				
				{gameboard}
				{guessInput}
				{authorGuessSection}
				{victoryMessage}
				
			</div>
		);
	}

}



// some seed quotes for testing

let quoteLibrary = [
  {
    body: "In three words I can sum up everything I've learned about life : it goes on",
    author: "Robert Frost"
  },
  {
    body: "The irony of commitment is that it's deeply liberating - in work, in play, in love",
    author: "Anne Morris"
  },

  {
    body: "Do what you feel in your heart to be right - for you'll be criticized anyway",
    author: "Eleanor Roosevelt"
  },

  {
    body: "Life is a succession of lessons which must be lived to be understood",
    author: "Ralph Waldo Emerson"
  },

  {
    body: "Life is a succession of lessons which must be lived to be understood",
    author: "Ralph Waldo Emerson"
  },

  {
    body: "Life is a succession of lessons which must be lived to be understood",
    author: "Ralph Waldo Emerson"
  },

  {
    body: "The secret of getting ahead is getting started",
    author: "Mark Twain"
  },

  {
    body: "Try to be a rainbow in someone's cloud",
    author: "Maya Angelou"
  }

]


export default Speecher;