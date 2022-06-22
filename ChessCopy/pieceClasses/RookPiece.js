

class RookPiece {
  possibleMoves(piece, player) {
      const [curLet, curNum] = piece.closest('.square').id.split('');
      const villian = player === 'white' ? 'black' : 'white';
      const possiblePositions = [];

      let curLetCopy1 = curLet.charCodeAt(0);
      let curNumCopy1 = +curNum;
      let curLetCopy2 = curLet.charCodeAt(0);
      let curNumCopy2 = +curNum;
      let curLetCopy3 = curLet.charCodeAt(0);
      let curNumCopy3 = +curNum;
      let curLetCopy4 = curLet.charCodeAt(0);
      let curNumCopy4 = +curNum;

      for (let i = 0; i < 8; i++) {
        const up = `${String.fromCharCode(curLetCopy1)}${curNumCopy1 += 1}`;
        const curSquare = document.getElementById(up);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(up);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(up);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const right = `${String.fromCharCode(curLetCopy2 += 1)}${curNumCopy2}`;
        const curSquare = document.getElementById(right);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(right);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(right);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const down = `${String.fromCharCode(curLetCopy3)}${curNumCopy3 -= 1}`;
        const curSquare = document.getElementById(down);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(down);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(down);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const left = `${String.fromCharCode(curLetCopy4 -= 1)}${curNumCopy4}`;
        const curSquare = document.getElementById(left);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(left);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(left);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      return possiblePositions;
  }
};


export default new RookPiece();