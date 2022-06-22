

class KingPiece {
  possibleMoves(piece, player) {
      const [curLet, curNum] = piece.closest('.square').id.split('');
      const villian = player === 'white' ? 'black' : 'white';
      const allPossiblePositions = [];

      const curLetCopy1 = curLet.charCodeAt(0);
      const curNumCopy1 = +curNum;

      const up = `${String.fromCharCode(curLetCopy1)}${curNumCopy1 + 1}`;
      const upLeft = `${String.fromCharCode(curLetCopy1 - 1)}${curNumCopy1 + 1}`;
      const upRight = `${String.fromCharCode(curLetCopy1 + 1)}${curNumCopy1 + 1}`;
      const right = `${String.fromCharCode(curLetCopy1 + 1)}${curNumCopy1}`;
      const left = `${String.fromCharCode(curLetCopy1 - 1)}${curNumCopy1}`;
      const down = `${String.fromCharCode(curLetCopy1)}${curNumCopy1 - 1}`;
      const downLeft = `${String.fromCharCode(curLetCopy1 - 1)}${curNumCopy1 - 1}`;
      const downRight = `${String.fromCharCode(curLetCopy1 + 1)}${curNumCopy1 - 1}`;

      allPossiblePositions.push(up, upLeft, upRight, right, left, down, downLeft, downRight);

      const possiblePositions = allPossiblePositions.filter(pos => {
        const square = document.getElementById(pos);
        if (!square) return;
        const occupyingPiece = Array.from(square.children)[0];
        if (!occupyingPiece) return pos;
        else if (occupyingPiece.classList.contains(villian)) return pos;
      });

      return possiblePositions; 
  }

  checkAllLines(kingState, piece, player) {
    const [curLet, curNum] = piece.closest('.square').id.split('');
    if (!curLet) return; // king not on board
    const villian = player === 'white' ? 'black' : 'white';

    const threatPieces = [];
    const blockPieces = [];
    const checkPieces = [];
    
    let curLetCopy1 = curLet.charCodeAt(0);
    let curNumCopy1 = +curNum;
    let curLetCopy2 = curLet.charCodeAt(0);
    let curNumCopy2 = +curNum;
    let curLetCopy3 = curLet.charCodeAt(0);
    let curNumCopy3 = +curNum;
    let curLetCopy4 = curLet.charCodeAt(0);
    let curNumCopy4 = +curNum;
    let curLetCopy5 = curLet.charCodeAt(0);
    let curNumCopy5 = +curNum;
    let curLetCopy6 = curLet.charCodeAt(0);
    let curNumCopy6 = +curNum;
    let curLetCopy7 = curLet.charCodeAt(0);
    let curNumCopy7 = +curNum;
    let curLetCopy8 = curLet.charCodeAt(0);
    let curNumCopy8 = +curNum;
    
    
    const downLeftArr = [];
    for (let i = 0; i < 8; i++) {
      const downLeftDiagonal = `${String.fromCharCode(curLetCopy4 -= 1)}${curNumCopy4 -= 1}`;
      const curSquare = document.getElementById(downLeftDiagonal);
      if (!curSquare) break;
      const occupyingPiece = Array.from(curSquare.children)[0];

      if (
        occupyingPiece &&
        occupyingPiece.classList.contains(villian) &&
        (occupyingPiece.classList.contains('queen-piece') ||
        occupyingPiece.classList.contains('bishop-piece'))
      ) {
        let blockingPiece = '';
        downLeftArr.forEach(sq => {
          const square = document.getElementById(sq);
          const piece = Array.from(square.children)[0];
          if (piece) blockingPiece = piece;
        });

        if (blockingPiece) {
          blockPieces.push(blockingPiece);
          threatPieces.push(occupyingPiece);
          console.log(`${player} king blocked from check!`);
        }
        else {
          checkPieces.push(occupyingPiece);
          console.log(`${player} king in check`);
        }
        break;   

      } else downLeftArr.push(downLeftDiagonal);
    }

    const downArr = [];
    for (let i = 0; i < 8; i++) {
      const down = `${String.fromCharCode(curLetCopy7)}${curNumCopy7 -= 1}`;
      const curSquare = document.getElementById(down);
      if (!curSquare) break;
      const occupyingPiece = Array.from(curSquare.children)[0];

      if (
        occupyingPiece &&
        occupyingPiece.classList.contains(villian) &&
        (occupyingPiece.classList.contains('queen-piece') ||
        occupyingPiece.classList.contains('rook-piece'))
      ) {
        let blockingPiece = '';
        downArr.forEach(sq => {
          const square = document.getElementById(sq);
          const piece = Array.from(square.children)[0];
          if (piece) blockingPiece = piece;
        });

        if (blockingPiece) {
          blockPieces.push(blockingPiece);
          threatPieces.push(occupyingPiece);
          console.log(`${player} king blocked from check!`);
        }
        else {
          checkPieces.push(occupyingPiece);
          console.log(`${player} king in check`);
        }
        break;   

      } else downArr.push(down);
    }

    const downRightArr = [];
    for (let i = 0; i < 8; i++) {
      const downRightDiagonal = `${String.fromCharCode(curLetCopy3 += 1)}${curNumCopy3 -= 1}`;
      const curSquare = document.getElementById(downRightDiagonal);
      if (!curSquare) break;
      const occupyingPiece = Array.from(curSquare.children)[0];

      if (
        occupyingPiece &&
        occupyingPiece.classList.contains(villian) &&
        (occupyingPiece.classList.contains('queen-piece') ||
        occupyingPiece.classList.contains('bishop-piece'))
      ) {
        let blockingPiece = '';
        downRightArr.forEach(sq => {
          const square = document.getElementById(sq);
          const piece = Array.from(square.children)[0];
          if (piece) blockingPiece = piece;
        });

        if (blockingPiece) {
          blockPieces.push(blockingPiece);
          threatPieces.push(occupyingPiece);
          console.log(`${player} king blocked from check!`);
        }
        else {
          checkPieces.push(occupyingPiece);
          console.log(`${player} king in check`);
        }
        break;   

      } else downRightArr.push(downRightDiagonal);
    }



    kingState.threatPieces = threatPieces;
    kingState.blockPieces = blockPieces;
    kingState.checkPieces = checkPieces;
    const inCheck = checkPieces.length > 0 ? true : false;
    if (inCheck) kingState.inCheck = true;
    else kingState.inCheck = false;
  }

};
  



export default new KingPiece();