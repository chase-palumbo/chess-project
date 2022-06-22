import BishopPiece from './pieceClasses/BishopPiece.js';
import WhitePawnPiece from './pieceClasses/WhitePawnPiece.js';
import RookPiece from './pieceClasses/RookPiece.js';
import KnightPiece from './pieceClasses/KnightPiece.js';
import KingPiece from './pieceClasses/KingPiece.js';
import QueenPiece from './pieceClasses/QueenPiece.js';
import BlackPawnPiece from './pieceClasses/BlackPawnPiece.js';

const board = document.querySelector('.board');
const actionLog = document.querySelector('.action-log');
const takenPieces = document.querySelector('.taken-pieces--box');
const lostPieces = document.querySelector('.lost-pieces--box');
const blackKing = document.querySelector('.king-piece.black');
const whiteKing = document.querySelector('.king-piece.white');

// state =
// turnNum,
// curPiece,
// curSquare,
// pieceType,
// module,
// possibleMoves,
// player,
// activePlayer,
// check
const state = {
  turnNum: 1,
  
  whiteKing: {
    threatPieces: [],
    blockPieces: [],
    checkPieces: []
  },

  blackKing: {
    threatPieces: [],
    blockPieces: [],
    checkPieces: []
  },
};



// Get data from clicked piece
const updateState = function(e) {
  state.curPiece = e.target.closest('.piece');
  if (!state.curPiece) return;

  state.curSquare = e.target.closest('.square');
  state.pieceType = state.curPiece.classList[0];
  state.player = state.curPiece.classList.contains('white') ? 'white' : 'black';

  state.activePlayer = state.turnNum % 2 !== 0 ? 'white' : 'black';

  state.module = 
    state.pieceType === 'pawn-white-piece' ? WhitePawnPiece
    : state.pieceType === 'pawn-black-piece' ? BlackPawnPiece
    : state.pieceType === 'bishop-piece' ? BishopPiece
    : state.pieceType === 'rook-piece' ? RookPiece
    : state.pieceType === 'knight-piece' ? KnightPiece
    : state.pieceType === 'king-piece' ? KingPiece
    : state.pieceType === 'queen-piece' ? QueenPiece
    : null;
  
  state.possibleMoves = state.module.possibleMoves(state.curPiece, state.player);
  console.log(state);
};

// Add borders to current squares and move squares
const renderSquares = function() {
  const curSquare = state.curSquare;
  if (
    !state.curPiece ||
    !curSquare 
    ) return;
  const moves = state.possibleMoves;

  curSquare.classList.add('clicked-square');
  moves.forEach(move => {
    const moveSquare = document.getElementById(move);
    moveSquare.classList.add('drop-square');
  });
};

// Drop piece in valid square.  Remove this click event
// and restore first click event.
const dropPiece = function(e) {
  const dropSquare = e.target.closest('.square');
  const curPlayer = state.player;

  if (
    !dropSquare ||
    !state.possibleMoves.includes(dropSquare.id)
  ) {
    unclickPiece();
    return;

  } else if (dropSquare.children.length > 0) {
    const occupyingPiece = Array.from(dropSquare.children)[0];

    state.player === 'white' ? takenPieces.appendChild(occupyingPiece) 
    : lostPieces.appendChild(occupyingPiece);

    dropPieceHandler(dropSquare, state.curPiece, state.player);
    updateActionLog(dropSquare, occupyingPiece);

  } else {
    dropPieceHandler(dropSquare, state.curPiece, state.player);
    updateActionLog(dropSquare);
  }  
};

const dropPieceHandler = function(dropSq, piece) {
  dropSq.appendChild(piece);
  unclickPiece();
  KingPiece.checkAllLines(state.whiteKing, whiteKing, 'white');
  KingPiece.checkAllLines(state.blackKing, blackKing, 'black');
  // checkIfCheck(piece, player);
  state.turnNum++;
};

// Remove current click event and add new drop click event
const movePiece = function(e) {
  const piece = state.curPiece;
  if (!piece) return;

  board.removeEventListener('click', clickPieceHandler);
  board.addEventListener('click', dropPiece);
};

// Unclick clicked piece and restore events
const unclickPiece = function() {
  state.curSquare.classList.remove('clicked-square');
  const moves = state.possibleMoves;
  moves.forEach(move => {
    const moveSquare = document.getElementById(move);
    moveSquare.classList.remove('drop-square');
  });

  board.removeEventListener('click', dropPiece);
  board.addEventListener('click', clickPieceHandler);
};


// Add move to action log
const updateActionLog = function(dropSq, takenPiece = '') {
  const turn = state.turnNum;
  const curPiece = state.pieceType.split('-')[0];
  const pieceName = curPiece[0].toUpperCase() + curPiece.slice(1);
  const curSquare = state.curSquare.id;
  const color = state.player[0].toUpperCase();
  const dropSquare = dropSq.id;

  const checkMarkup = `
    <span class="action-check--${state.player}"><strong>CHECK!</strong> </span>
  `;
  
  const markup = takenPiece ? `
    <ul class="action-text">${turn}. ${state.check ? checkMarkup : ''}${color}-${pieceName} on ${curSquare} to ${dropSquare}.  Player ${state.player} takes out ${takenPiece.classList[0]}!</ul>
    ` 
    : `
    <ul class="action-text">${turn}. ${state.check ? checkMarkup : ''}${color}-${pieceName} on ${curSquare} to ${dropSquare}</ul>
  `;
  
  actionLog.insertAdjacentHTML('afterbegin', markup);
};




const undoMove = function(king) {
  
  
};

// Called when a piece is clicked
const clickPieceHandler = function(e) {
  updateState(e);
  // if (state.activePlayer !== state.player) return;
  renderSquares();
  movePiece(e);
};

// Board listens for a clicked piece
board.addEventListener('click', clickPieceHandler);











