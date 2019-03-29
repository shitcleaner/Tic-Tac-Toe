import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UpdateScore from "./updateScores";
import FBLogin from "./fbLogin";

// import { Container, Row, Col, Jumbotron, Card, CardImg, CardText, CardBody,
//   CardTitle, CardSubtitle} from 'reactstrap';

//ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Square component: w/t "state" variables : a function component
// O: A button: with
// C:- onclick event function  - and text value : receives "props"

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
//Board: class component: with "states" variables/objects whose changes need to be tracked/ recorded for further use.
// O: 9 buttons: "Square" components objects
// C: the status objects of the whole board of game for "calculating winner","history panel"  features
// P: - contructor()+ render()
//- the onclickhandler():=> pass as a "function props" to the Square to change the status of the "Squares"

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      counter: 0,
      clickcount: [0]
    };
  }

  handleClick(i) {
    const squareArray = this.state.squares;
    squareArray[i] = this.state.xIsNext ? "X" : "O";
    // squares[i] = 'X';
    let counter = this.state.counter + 1;
    let count = this.state.clickcount.concat(counter);
    console.log(count);
    this.setState({
      squares: squareArray,
      xIsNext: !this.state.xIsNext,
      counter: counter,
      clickcount: count
    });

    console.log(this.state.squares);
    let Winner = this.calculateWinner(squareArray[i]);
    if (Winner || squareArray[i]) {
      return;
    }
  }

  // Board.P: calculateWinner()

  calculateWinner(squares) {
    let winnerArray = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 3, 6],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7]
    ];
    for (let i = 0; i < winnerArray.length; i++) {
      const [a, b, c] = winnerArray[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;
    let Winner = this.calculateWinner(this.state.squares);
    if (Winner) {
      status = "Congratulations!" + "  " + Winner + "  You won !";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const renderMoveBtn = this.state.clickcount.map(i => {
      if (i === 0) {
        return (
          <p>
            {" "}
            <button> Start the Game! </button>
          </p>
        );
      }
      return (
        <p>
          {" "}
          <button> You've made the {i}th Move! </button>{" "}
        </p>
      );
    });

    return (
      <div>
        <div className="status">{status}</div>
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
        <div>
          {" "}
          <h2> History of your Moves </h2>
          <p>{renderMoveBtn} </p>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div>
          {" "}
          <FBLogin />{" "}
        </div>
        <div className="game-board">
          <Board />
        </div>
        <div>
          <UpdateScore />{" "}
        </div>
        <div className="App" />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
