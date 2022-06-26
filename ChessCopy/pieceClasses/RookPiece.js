

class RookPiece {
  possibleMoves(piece, player) {
    const [curLet, curNum] = piece.parentElement.id.split('');
    const possiblePositions = [];

    const upStraight = [0, 1];
    this.getMoves(upStraight, curLet, curNum, player, possiblePositions);

    const rightStraight = [1, 0];
    this.getMoves(rightStraight, curLet, curNum, player, possiblePositions);

    const downStraight = [0, -1];
    this.getMoves(downStraight, curLet, curNum, player, possiblePositions);

    const leftStraight = [-1, 0];
    this.getMoves(leftStraight, curLet, curNum, player, possiblePositions);
      
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


export default new RookPiece();