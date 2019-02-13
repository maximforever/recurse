// main game component

import React, { Component } from 'react';

import Gameboard from './Gameboard'
import InputForm from './InputForm'
import AuthorGuesser from './AuthorGuesser'


class Speecher extends Component {

  	constructor(props){
    	super(props);
    	
    	this.state = {
    		money: 1000,
    		allWordsGuessed: false,
    		authorGuessed: false,
    		currentGuess: "",
    		answer: "",
    		answerWords: [],
    		remainingWords: [],
        error: ""
    	}

    	this.selectRandomQuote();

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


  	separatePunctuation(quote){

  		let editedQuote = [];
		let newQuote = quote.split(" ");
		let chars = [".", ",", "!", "?", ":", ";"];

		for(var i = 0; i < newQuote.length; i++){
			let word = newQuote[i];
			let lastLetter = word[word.length - 1];
			if(chars.indexOf(lastLetter) !== -1){
				editedQuote.push(word.substring(0, word.length - 1), lastLetter)
			} else {
				editedQuote.push(word);
			}
		}

		return editedQuote;
  	}

  	stripPunctuation(quote){

  		let chars = [".", ",", "!", "?", ":", ";"];
	  	let quoteArray = this.separatePunctuation(quote);

  		return quoteArray.filter((word) => {
  			return !chars.includes(word)
  		})


  	}

  	selectRandomQuote(){
    	

      this.state.error = "";

  		fetch('http://quotes.rest/qod/categories.json')
  		.then(res => res.json())
  		.then(jres => {
  			let categories = Object.keys(jres.contents.categories);
  			let randomCategory = categories[Math.floor(Math.random() * categories.length)];

  			return randomCategory;
  		})
  		.then(randomCategory => {
  			let url = `http://quotes.rest/qod.json?category=${randomCategory}`;
  			console.log(url);
  			return fetch(url)
  		}) 
		.then(res => res.json())
		.then(jres => {
  			console.log(jres.contents.quotes[0].quote);



  			const quote = {
  				"body": jres.contents.quotes[0].quote.replace(/’/gi, "'"),
  				"author": jres.contents.quotes[0].author,
  				"category": jres.contents.quotes[0].category
  			}

			 this.setState({
	    		answer: quote,
	     		answerWords: this.separatePunctuation(quote.body),
	     		remainingWords: this.stripPunctuation(quote.body)
	    	})

  		})
  		
  		.catch(err => {
  			console.log("looks like there's an issue...");
  			console.log(err);
        //this.state.error = err;
	  		// this.selectRandomQuote()		// this is just... asking for trouble.
        
        // the API has a limit of 10 requests an hour, which is not great. 
        // So, if this fails, I should set a quote from a local backup

        this.getLocalQuote();

  		})
    	
  	}

    getLocalQuote(){
      let quote = quoteLibrary[Math.floor((Math.random()*quoteLibrary.length))];

      this.setState({
          category: "General",
          answer: quote,
          answerWords: this.separatePunctuation(quote.body),
          remainingWords: this.stripPunctuation(quote.body)
      })
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

  		if(this.state.answer.length === 0){
  			return <p>Loading...</p>
  		} else if (this.state.error.length){
        return (
          <div className = "error">
            <p>Looks like something went wrong - try again in an hour!</p>
            <pre>{this.state.error}</pre>
          </div>
        )
      } else {
  			return(<Gameboard 
				money={this.state.money} 
				category={this.state.answer.category} 
				answerWords={this.state.answerWords} 
				remainingWords={this.state.remainingWords} 
				buyWord={(word) => this.buyWord(word)}
			/>)
  		}
  		
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
	  				<i className="fas fa-star"></i>
	  				<i className="fas fa-star"></i>
	  				<i className="fas fa-star"></i>
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

		// is this the best way to conditionally render a bunch of sections?

		return(
			<div className="speecher">
				<h1><i className="fas fa-microphone-alt"></i> Say What!?</h1>
				

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