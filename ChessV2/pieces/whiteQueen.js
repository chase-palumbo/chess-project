import Piece from "./pieceClass.js";

export class WhiteQueen extends Piece {
  type = 'Queen';
  player = 'White';
  img = './pieceImgs/White_Queen.svg.png';

  constructor(squareID, pieceID) {
    super();
    this.square = document.getElementById(squareID);
    this.createPiece(pieceID);
  }

  createPiece(pieceID) {
    this.pieceHTML = `<img id="${pieceID}" class="queen piece white" src="${this.img}"/>`
    this.square.insertAdjacentHTML('afterbegin', this.pieceHTML);

    this.piece = document.getElementById(pieceID);
    this.id = pieceID;
  }

  calcMoves(state) {
    const whiteOccupied = state.white.occupiedSquares;
    const controlSquares = [];

    const upStraight = [0, 1];
    this.calcDirection(state.allOccupiedSquares, upStraight, controlSquares);

    const rightStraight = [1, 0];
    this.calcDirection(state.allOccupiedSquares, rightStraight, controlSquares);

    const downStraight = [0, -1];
    this.calcDirection(state.allOccupiedSquares, downStraight, controlSquares);

    const leftStraight = [-1, 0];
    this.calcDirection(state.allOccupiedSquares, leftStraight, controlSquares);

    const upRightDiag = [1, 1];
    this.calcDirection(state.allOccupiedSquares, upRightDiag, controlSquares);

    const downRightDiag = [1, -1];
    this.calcDirection(state.allOccupiedSquares, downRightDiag, controlSquares);

    const downLeftDiag = [-1, -1];
    this.calcDirection(state.allOccupiedSquares, downLeftDiag, controlSquares);

    const upLeftDiag = [-1, 1];
    this.calcDirection(state.allOccupiedSquares, upLeftDiag, controlSquares);
    
    this.control = controlSquares;
    this.moves = controlSquares.filter(sq => !whiteOccupied.includes(sq));
  }

};