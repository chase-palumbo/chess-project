const boardSquares = [
  'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
  'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
  'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
  'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
  'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
];

class WhitePawnPiece {
  // possibleMoves(piece) {
  //     const [curLet, curNum] = piece.closest('.square').id.split('');
     
  //     const possibleNumber = String.fromCharCode(curNum.charCodeAt(0) + 1);
    
  //     const position = `${curLet}${possibleNumber}`;
  //     const possiblePosition = boardSquares.includes(position) ? [position] : null;

  //     const openMove = this.checkOccupiedSquares(possiblePosition);
  //     return openMove;
  // }

  possibleMoves(piece) {
    const [curLet, curNum] = piece.closest('.square').id.split('');
    const possibleAttacks = [];
    const validMoves = [];

    const curLetCopy1 = curLet.charCodeAt(0);
    const curNumCopy1 = +curNum;

    const up = `${String.fromCharCode(curLetCopy1)}${curNumCopy1 + 1}`;
    const upSquare = document.getElementById(up);
    if (upSquare.children.length < 1) validMoves.push(up);

    const upLeft = `${String.fromCharCode(curLetCopy1 - 1)}${curNumCopy1 + 1}`;
    const upRight = `${String.fromCharCode(curLetCopy1 + 1)}${curNumCopy1 + 1}`;
    possibleAttacks.push(upLeft, upRight);

    const validAttacks = possibleAttacks.filter(pos => {
      const square = document.getElementById(pos);
      if (!square) return;
      const occupyingPiece = Array.from(square.children)[0];
      if (occupyingPiece &&
        occupyingPiece.classList.contains('black')) return pos;
    });

    const allMoves = [...validMoves, ...validAttacks];

    return allMoves;
  };
};

export default new WhitePawnPiece();



