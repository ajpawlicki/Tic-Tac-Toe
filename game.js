'use strict';
// const prompt = require('prompt');
// prompt.start();
const prompt = require('readline-sync');
const board = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

class Game {
  constructor() {
    this.board = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ];
    this.moves = 0;
    this.currPlayer = 'x';
  }
  switchPlayer() {
    this.currPlayer = this.currPlayer === 'x' ? 'o' : 'x';
  }
  showBoard() {
    // show board after every move
    console.log(`${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`);
    console.log(`${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`);
    console.log(`${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`);
  }
  placeMove({row, col}) {
    this.board[row][col] = this.currPlayer;
  }
  promptPlayerMove() {
    return prompt.question(`Player ${this.currPlayer}, what is your move? `);
    /*let move;
    prompt.get(['What is your move?'], (err, result) => {
      move = result['What is your move?'];
      console.log(`Player ${this.currPlayer} chose ${move}`);
    })*/
  }
  convMoveToRowCol(move) {
    // move is number btwn 1 and 9
    let row = Math.ceil(move/3) - 1;
    let col = (move - 1) % 3;
    return {row, col};
  }
  checkIfValidMove(move) {
    // check that move is int and between 1 and 9
    // check if move is available
    // if both are true return true
    // else return false
    let number = Number(move);
    return number >= 1 && number <= 9 && this.checkIfAvailMove(move);
  }
  checkIfAvailMove(move) {
    let {row, col} = this.convMoveToRowCol(move);
    return typeof this.board[row][col] === 'number';
  }
  checkForWinner(move) {
    // check rows
    // check columns
    // check diagonals
    let {row, col} = this.convMoveToRowCol(move);
    return this.checkRows(row) || this.checkColumns(col) || this.checkDiagonals();
  }
  checkRows(row) {
    return this.areAllEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
  }
  checkColumns(col) {
    return this.areAllEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
  }
  checkDiagonals() {
    return this.areAllEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
  }
  areAllEqual(a, b, c) {
    return a === b && b === c;
  }
  play() {
    this.showBoard();
    let move = this.promptPlayerMove();
    let {row, col} = this.convMoveToRowCol(move);
    let isWinner;
    if (this.checkIfValidMove(move) === true) {
      this.placeMove(this.convMoveToRowCol(move));
      this.moves++;
      this.switchPlayer();
      isWinner = this.checkForWinner(move);
    } else if (this.checkIfValidMove(move) === false) {
      console.log('That is not a valid move. Please choose again!');
    }
    // check if there is winner
    if (isWinner === true) {
      // announce winner
      this.switchPlayer();
      console.log(`Game over! Player ${this.currPlayer} wins!`);
      this.showBoard();
    }
    // check if there is draw
    if (isWinner === false && this.moves === 9) {
      // announce draw
      console.log('Game over, it is a draw.');
      this.showBoard();
    }
    // if there isn't a winner or isn't a draw
    if (isWinner !== true && this.moves < 9) this.play();
  }
};

class Player {
  constructor() {
    // this.name;
  }
};

let game = new Game();
game.play();