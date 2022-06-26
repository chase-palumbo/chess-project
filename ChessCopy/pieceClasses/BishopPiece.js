

class BishopPiece {
  possibleMoves(piece, player) {
    const [curLet, curNum] = piece.parentElement.id.split('');
    const possiblePositions = [];
    
    const upRightDiag = [1, 1];
    this.getMoves(upRightDiag, curLet, curNum, player, possiblePositions);

    const downRightDiag = [1, -1];
    this.getMoves(downRightDiag, curLet, curNum, player, possiblePositions);

    const downLeftDiag = [-1, -1];
    this.getMoves(downLeftDiag, curLet, curNum, player, possiblePositions);

    const upLeftDiag = [-1, 1];
    this.getMoves(upLeftDiag, curLet, curNum, player, possiblePositions);

    return possiblePositions;
  }

  getMoves(direction, squareLetter, squareNumber, player, allMovesArr) {
    const villian = player === 'white' ? 'black' : 'white';
    let curLetCopy = squareLetter.charCodeAt(0);
    let curNumCopy = +squareNumber;

    for (let i = 0; i < 8; i++) {
      const nextSquare = `${String.fromCharCode(curLetCopy += direction[0])}${curNumCopy += direction[1]}`;
      const curSquare = document.getElementById(nextSquare);
      if (!curSquare) break;
      const occupyingPiece = Array.from(curSquare.children)[0];

      if (!occupyingPiece) allMovesArr.push(nextSquare);
      else if (occupyingPiece.classList.contains(villian)) {
        allMovesArr.push(nextSquare);
        break;
      } else if (occupyingPiece.classList.contains(player)) break;
    }
  }
};


export default new BishopPiece();
