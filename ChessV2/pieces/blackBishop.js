import Piece from "./pieceClass.js";

export class BlackBishop extends Piece {
  type = 'Bishop';
  player = 'Black';
  img = './pieceImgs/Black_Bishop.svg.png';

  constructor(squareID, pieceID) {
    super();
    this.square = document.getElementById(squareID);
    this.createPiece(pieceID);
  }

  createPiece(pieceID) {
    this.pieceHTML = `<img id="${pieceID}" class="bishop piece black" src="${this.img}"/>`
    this.square.insertAdjacentHTML('afterbegin', this.pieceHTML);

    this.piece = document.getElementById(pieceID);
    this.id = pieceID;
  }

  calcMoves(state) {
    const blackOccupied = state.black.occupiedSquares;
    const controlSquares = [];

    const upRightDiag = [1, 1];
    this.calcDirection(state.allOccupiedSquares, upRightDiag, controlSquares);

    const downRightDiag = [1, -1];
    this.calcDirection(state.allOccupiedSquares, downRightDiag, controlSquares);

    const downLeftDiag = [-1, -1];
    this.calcDirection(state.allOccupiedSquares, downLeftDiag, controlSquares);

    const upLeftDiag = [-1, 1];
    this.calcDirection(state.allOccupiedSquares, upLeftDiag, controlSquares);
    
    this.control = controlSquares;
    this.moves = controlSquares.filter(sq => !blackOccupied.includes(sq));
  }

};