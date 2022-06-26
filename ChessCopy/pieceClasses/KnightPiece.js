

class KnightPiece {
  possibleMoves(piece, player) {
      const [curLet, curNum] = piece.parentElement.id.split('');
      const villian = player === 'white' ? 'black' : 'white';
      const allPossiblePositions = [];

      const curLetCopy1 = curLet.charCodeAt(0);
      const curNumCopy1 = +curNum;

      const upPos1 = `${String.fromCharCode(curLetCopy1 - 1)}${curNumCopy1 + 2}`;
      const upPos2 = `${String.fromCharCode(curLetCopy1 + 1)}${curNumCopy1 + 2}`;
      const rightPos1 = `${String.fromCharCode(curLetCopy1 + 2)}${curNumCopy1 + 1}`;
      const rightPos2 = `${String.fromCharCode(curLetCopy1 + 2)}${curNumCopy1 - 1}`;
      const downPos1 = `${String.fromCharCode(curLetCopy1 + 1)}${curNumCopy1 - 2}`;
      const downPos2 = `${String.fromCharCode(curLetCopy1 - 1)}${curNumCopy1 - 2}`;
      const leftPos1 = `${String.fromCharCode(curLetCopy1 - 2)}${curNumCopy1 - 1}`;
      const leftPos2 = `${String.fromCharCode(curLetCopy1 - 2)}${curNumCopy1 + 1}`;

      allPossiblePositions.push(upPos1, upPos2, rightPos1, rightPos2, downPos1, downPos2, leftPos1, leftPos2);

      const possiblePositions = allPossiblePositions.filter(pos => {
        const square = document.getElementById(pos);
        if (!square) return;
        const occupyingPiece = Array.from(square.children)[0];
        if (!occupyingPiece) return pos;
        else if (occupyingPiece.classList.contains(villian)) return pos;
      });

      return possiblePositions;  
  }
};


export default new KnightPiece();