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

const allSquares = Array.from(board.children);

let allWhitePieces = [];
allSquares.forEach(sq => {
  const occupyingPiece = sq.children[0];

  occupyingPiece && occupyingPiece.classList.contains('white') ? allWhitePieces.push(occupyingPiece) : sq;
});

let allBlackPieces = [];
allSquares.forEach(sq => {
  const occupyingPiece = sq.children[0];

  occupyingPiece && occupyingPiece.classList.contains('black') ? allBlackPieces.push(occupyingPiece) : sq;
});
console.log(allBlackPieces);

// remove Piece from allPieces array
const arrayRemove = (arr, value) => arr.filter(el => el !== value);



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

  if (state.pieceType === 'king-piece') preventSelfCheck(state.curPiece, state.player);

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

  // Checks if square is a valid move
  if (
    !dropSquare ||
    !state.possibleMoves.includes(dropSquare.id)
  ) {
    unclickPiece();
    return;

  // Checks if square has a villain piece in it and captures it
  }  else if (dropSquare.children.length > 0) {
    const capturedPiece = Array.from(dropSquare.children)[0];
    if (curPlayer === 'white') {
      takenPieces.appendChild(capturedPiece);
      allBlackPieces = arrayRemove(allBlackPieces, capturedPiece);
    } else {
      lostPieces.appendChild(capturedPiece);
      allWhitePieces = arrayRemove(allWhitePieces, capturedPiece);
    }
    dropPieceHandler(dropSquare, state.curPiece, curPlayer);
    updateActionLog(dropSquare, curPlayer, capturedPiece);

  // Moves to valid empty square
  } else {
    dropPieceHandler(dropSquare, state.curPiece, curPlayer);
    updateActionLog(dropSquare, curPlayer);
  }  
};

const dropPieceHandler = function(dropSq, piece, player) {
  const villainKingState = player === 'white' ? state.blackKing : state.whiteKing;

  dropSq.appendChild(piece);
  unclickPiece();
  checkForCheck(piece, player, villainKingState);
  
  // If check, check for checkmate
  if (villainKingState.inCheck) checkForCheckmate(player, villainKingState);

  // Checks for threatening bishop, rook, queen pieces;
  KingPiece.checkAllLines(state.whiteKing, whiteKing, 'white');
  KingPiece.checkAllLines(state.blackKing, blackKing, 'black');

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
const updateActionLog = function(dropSq, player, takenPiece = '') {
  const turn = state.turnNum;
  const curPiece = state.pieceType.split('-')[0];
  const pieceName = curPiece[0].toUpperCase() + curPiece.slice(1);
  const curSquare = state.curSquare.id;
  const color = player[0].toUpperCase();
  const dropSquare = dropSq.id;
  const villainKingState = player === 'white' ? state.blackKing : state.whiteKing;

  const checkMarkup = `
    <span class="action-check--${player}"><strong>CHECK!</strong> </span>
  `;
  
  const markup = takenPiece ? `
    <ul class="action-text">${turn}. ${villainKingState.inCheck ? checkMarkup : ''}${color}-${pieceName} on ${curSquare} to ${dropSquare}.  Player ${player} takes out ${takenPiece.classList[0]}!</ul>
    ` 
    : `
    <ul class="action-text">${turn}. ${villainKingState.inCheck ? checkMarkup : ''}${color}-${pieceName} on ${curSquare} to ${dropSquare}</ul>
  `;
  
  actionLog.insertAdjacentHTML('afterbegin', markup);
};

const checkForCheck = function(curPc, player, vKingState) {
  let piecesArr = player === 'white' ? allWhitePieces : allBlackPieces;
  const allNextHeroMoves = getAllMoves(piecesArr, player);

  const villainKing = player === 'white' ? blackKing : whiteKing;
  const vKingSquareID = villainKing.parentElement.id;

  const check = allNextHeroMoves.includes(vKingSquareID) ? true : false;
    
  if (check) {
    vKingState.inCheck = true;
    console.log('CHECK');
  }
  else vKingState.inCheck = false;
};

// If villain King is in check:
const checkForCheckmate = function(player) {
  const villain = player === 'white' ? 'black' : 'white';
  const villainKing = player === 'white' ? blackKing : whiteKing;
  let piecesArr = player === 'white' ? allWhitePieces : allBlackPieces;

  // get villain King moves
  const nextKingMoves = KingPiece.possibleMoves(villainKing, villain);

  // get ALL hero moves
  const allNextHeroMoves = getAllMoves(piecesArr, player);

  // check if all hero moves includes every villain king move;
  const checkmate = nextKingMoves.every(move => allNextHeroMoves.includes(move));

  if (checkmate) {
    console.log(checkmate);
    alert(`${player} Checkmate!`);
  } else return;
};

const getAllMoves = function(allPieces, player) {
  const allMoves = [];

  allPieces.forEach(piece => {
    const pieceType = piece.classList[0];
    const module = 
      pieceType === 'pawn-white-piece' ? WhitePawnPiece
      : pieceType === 'pawn-black-piece' ? BlackPawnPiece
      : pieceType === 'bishop-piece' ? BishopPiece
      : pieceType === 'rook-piece' ? RookPiece
      : pieceType === 'knight-piece' ? KnightPiece
      : pieceType === 'king-piece' ? KingPiece
      : pieceType === 'queen-piece' ? QueenPiece
      : null;
    
    const nextMoves = module.possibleMoves(piece, player);
    allMoves.push(...nextMoves);
  });

  return allMoves;
};

// Get all possible moves. After trying each move, get all villain moves and
// see if they include hero king square (check).  If so, filter that move out 
// of possibleMoves.
const simulateAllMoves = function(curPc, player) {
  if (!curPc) return;
  curPc.classList.add('hidden');
  const initialSq = state.curSquare;
  const villain = player === 'white' ? 'black' : 'white';
  const possibleMoves = state.possibleMoves;

  const newMoves = possibleMoves.filter(move => {
    const moveSquare = document.getElementById(move);

    const occupyingPiece = Array.from(moveSquare.children)[0];
    // see if capturing this piece will get your king out of check
    if (occupyingPiece) {
      occupyingPiece.classList.add('hidden');
      actionLog.appendChild(occupyingPiece);
      moveSquare.appendChild(curPc);


      let vPiecesArr = player === 'white' ? allBlackPieces : allWhitePieces;
      vPiecesArr = arrayRemove(vPiecesArr, occupyingPiece);
      const allNextVillainMoves = getAllMoves(vPiecesArr, villain);

      const kingSquare = player === 'white' ? whiteKing.parentElement.id : blackKing.parentElement.id;

      moveSquare.appendChild(occupyingPiece);
      occupyingPiece.classList.remove('hidden');
      vPiecesArr.push(occupyingPiece);

      if (!allNextVillainMoves.includes(kingSquare)) return move;

    } else {
      // see if moving to this square will get your king out of check
      moveSquare.appendChild(curPc);

      let vPiecesArr = player === 'white' ? allBlackPieces : allWhitePieces;
      const allNextVillainMoves = getAllMoves(vPiecesArr, villain);

      const kingSquare = player === 'white' ? whiteKing.parentElement.id : blackKing.parentElement.id;

      if (!allNextVillainMoves.includes(kingSquare)) return move;
    }
  });

  initialSq.appendChild(curPc);
  curPc.classList.remove('hidden');
  state.possibleMoves = newMoves;
};

// King Only: Update possibleMoves without self-check squares
const preventSelfCheck = function(kingPc, player) {
  const villain = player === 'white' ? 'black' : 'white';
  let vPiecesArr = player === 'white' ? allBlackPieces : allWhitePieces;
  const allNextVillainMoves = getAllMoves(vPiecesArr, villain);

  const curKingMoves = state.possibleMoves;
  const filteredMoves = curKingMoves.filter(move => !allNextVillainMoves.includes(move))

  state.possibleMoves = filteredMoves;
};







// Called when a piece is clicked
const clickPieceHandler = function(e) {
  updateState(e);
  // if (state.activePlayer !== state.player) return;
  const hKingState = state.player === 'white' ? state.whiteKing : state.blackKing;

  // Checks if your king is in check OR the piece you clicked on is blocking
  // your king from being in check
  if (
    hKingState.inCheck ||
    hKingState.blockPieces.includes(state.curPiece)
  ) simulateAllMoves(state.curPiece, state.player);
  

  renderSquares();
  movePiece(e);
};

// Board listens for a clicked piece
board.addEventListener('click', clickPieceHandler);







