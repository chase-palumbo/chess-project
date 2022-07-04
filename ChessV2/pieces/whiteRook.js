import Piece from "./pieceClass.js";

export class WhiteRook extends Piece {
  type = 'Rook';
  player = 'White';
  img = './pieceImgs/White_Rook.svg.png';

  constructor(squareID, pieceID) {
    super();
    this.square = document.getElementById(squareID);
    this.createPiece(pieceID);
  }

  createPiece(pieceID) {
    this.pieceHTML = `<img id="${pieceID}" class="rook piece white" src="${this.img}"/>`
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
    
    this.control = controlSquares;
    this.moves = controlSquares.filter(sq => !whiteOccupied.includes(sq));
  }

};