import React from 'react';

const VictoryMessage = ({ answer }) => (
    <div className="victory-message">
         <h1>
             <i className="fas fa-star"></i>
             <i className="fas fa-star"></i>
             <i className="fas fa-star"></i>
             <div className="victory-message-hooray">You got it!</div>
         </h1>

         <div className="quote-wrapper">
             <h3 className="quote">{answer.body}</h3>
             <h4 className="quote-author">~ {answer.author}</h4>
         </div>

         <a href ="/"><button className="again">Try Another</button></a>
     </div>
);

export default VictoryMessage;
