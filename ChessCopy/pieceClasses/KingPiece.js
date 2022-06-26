

class KingPiece {
  possibleMoves(piece, player) {
      const [curLet, curNum] = piece.parentElement.id.split('');
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
    const [curLet, curNum] = piece.parentElement.id.split('');
    if (!curLet || !curNum) return; // king not on board
    const villian = player === 'white' ? 'black' : 'white';

    const threatPieces = [];
    const blockPieces = [];
    const checkPieces = [];
    
    const downLeftDiag = [-1, -1];
    this.checkDiagonal(downLeftDiag, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const upRightDiag = [1, 1];
    this.checkDiagonal(upRightDiag, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const upLeftDiag = [-1, 1];
    this.checkDiagonal(upLeftDiag, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const downRightDiag = [1, -1];
    this.checkDiagonal(downRightDiag, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const upStraight = [0, 1];
    this.checkStraight(upStraight, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const rightStraight = [1, 0];
    this.checkStraight(rightStraight, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const leftStraight = [-1, 0];
    this.checkStraight(leftStraight, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    const downStraight = [0, -1];
    this.checkStraight(downStraight, curLet, curNum, villian, threatPieces, blockPieces, checkPieces);

    kingState.threatPieces = threatPieces;
    kingState.blockPieces = blockPieces;
    kingState.checkPieces = checkPieces;
  }

  checkDiagonal(
    direction, 
    squareLetter, 
    squareNumber, 
    villian, 
    threatArr, 
    blockArr, 
    checkArr
  ) {
    let curLetCopy = squareLetter.charCodeAt(0);
    let curNumCopy = +squareNumber;
    const directionArr = [];

    for (let i = 0; i < 8; i++) {
      const diagonalSquare = `${String.fromCharCode(curLetCopy += direction[0])}${curNumCopy += direction[1]}`;
      const curSquare = document.getElementById(diagonalSquare);
      if (!curSquare) break;
      const occupyingPiece = Array.from(curSquare.children)[0];

      if (
        occupyingPiece &&
        occupyingPiece.classList.contains(villian) &&
        (occupyingPiece.classList.contains('queen-piece') ||
        occupyingPiece.classList.contains('bishop-piece'))
      ) {
        let blockingPiece = '';
        directionArr.forEach(sq => {
          const square = document.getElementById(sq);
          const piece = Array.from(square.children)[0];
          if (piece) blockingPiece = piece;
        });

        if (blockingPiece) {
          blockArr.push(blockingPiece);
          threatArr.push(occupyingPiece);
          console.log(`blocked from check`);
        }
        else {
          checkArr.push(occupyingPiece);
          console.log(`king in check`);
        }
        break;   

      } else directionArr.push(diagonalSquare);
    }
  }

  checkStraight(
    direction, 
    squareLetter, 
    squareNumber, 
    villian, 
    threatArr, 
    blockArr, 
    checkArr
  ) {
    let curLetCopy = squareLetter.charCodeAt(0);
    let curNumCopy = +squareNumber;
    const directionArr = [];

    for (let i = 0; i < 8; i++) {
      const straightSquare = `${String.fromCharCode(curLetCopy += direction[0])}${curNumCopy += direction[1]}`;
      const curSquare = document.getElementById(straightSquare);
      if (!curSquare) break;
      const occupyingPiece = Array.from(curSquare.children)[0];

      if (
        occupyingPiece &&
        occupyingPiece.classList.contains(villian) &&
        (occupyingPiece.classList.contains('queen-piece') ||
        occupyingPiece.classList.contains('rook-piece'))
      ) {
        let blockingPiece = '';
        directionArr.forEach(sq => {
          const square = document.getElementById(sq);
          const piece = Array.from(square.children)[0];
          if (piece) blockingPiece = piece;
        });

        if (blockingPiece) {
          blockArr.push(blockingPiece);
          threatArr.push(occupyingPiece);
          console.log(`blocked from check`);
        }
        else {
          checkArr.push(occupyingPiece);
          console.log(`king in check`);
        }
        break;   

      } else directionArr.push(straightSquare);
    }
  }


};
  



export default new KingPiece();