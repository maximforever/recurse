import React from 'react';

const Word = ({ word, handleClick }) => {
		let styling = word.includes("_") ? "one-word" : "one-word guessed";

		return (
			<div className={styling} onClick={handleClick}> { word } </div>
		);
};

export default Word
