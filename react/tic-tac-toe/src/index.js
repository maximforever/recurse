import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheet.css';


function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      history:  [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i){

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]){     // squares[i] will be true if it's filled with any value, false if 'null  '
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })

  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? true : false
    })
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;

    if(winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next move: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    const moves = history.map((step, move) => {
      const description = move ? 'Go to move #' + move : 'Go to game start';

      return(
        <div className="board-history" key={move}>
          <button className="go-to-move" onClick={() => this.jumpTo(move)}>{description}</button>
          <Board 
            squares={history[move].squares}
          />
        </div>
      )
    })


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <div className="board-list">{ moves }</div>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {


  renderSquare(i) {
    return <Square 
      value= { this.props.squares[i] }
      onClick= { ()=> this.props.onClick(i) }
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}





function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++){

    const [a, b, c] = lines[i];     // apparently this is a a thing you can do

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return(squares[a]);
    } 

  }

  return null;

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
