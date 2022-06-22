

class QueenPiece {
  // possiblePositions = [];

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
      let curLetCopy5 = curLet.charCodeAt(0);
      let curNumCopy5 = +curNum;
      let curLetCopy6 = curLet.charCodeAt(0);
      let curNumCopy6 = +curNum;
      let curLetCopy7 = curLet.charCodeAt(0);
      let curNumCopy7 = +curNum;
      let curLetCopy8 = curLet.charCodeAt(0);
      let curNumCopy8 = +curNum;

      for (let i = 0; i < 8; i++) {
        const upRightDiagonal = `${String.fromCharCode(curLetCopy1 += 1)}${curNumCopy1 += 1}`;
        const curSquare = document.getElementById(upRightDiagonal);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(upRightDiagonal);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(upRightDiagonal);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const upLeftDiagonal = `${String.fromCharCode(curLetCopy2 -= 1)}${curNumCopy2 += 1}`;
        const curSquare = document.getElementById(upLeftDiagonal);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(upLeftDiagonal);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(upLeftDiagonal);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const downRightDiagonal = `${String.fromCharCode(curLetCopy3 += 1)}${curNumCopy3 -= 1}`;
        const curSquare = document.getElementById(downRightDiagonal);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(downRightDiagonal);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(downRightDiagonal);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const downLeftDiagonal = `${String.fromCharCode(curLetCopy4 -= 1)}${curNumCopy4 -= 1}`;
        const curSquare = document.getElementById(downLeftDiagonal);
        if (!curSquare) break;
        const occupyingPiece = Array.from(curSquare.children)[0];

        if (!occupyingPiece) possiblePositions.push(downLeftDiagonal);
        else if (occupyingPiece.classList.contains(villian)) {
          possiblePositions.push(downLeftDiagonal);
          break;
        } else if (occupyingPiece.classList.contains(player)) break;
      }

      for (let i = 0; i < 8; i++) {
        const up = `${String.fromCharCode(curLetCopy5)}${curNumCopy5 += 1}`;
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
        const right = `${String.fromCharCode(curLetCopy6 += 1)}${curNumCopy6}`;
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
        const down = `${String.fromCharCode(curLetCopy7)}${curNumCopy7 -= 1}`;
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
        const left = `${String.fromCharCode(curLetCopy8 -= 1)}${curNumCopy8}`;
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


export default new QueenPiece();