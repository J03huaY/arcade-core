/**
 * @param {number[][]} board
 * @param {() => number} [rng]  returns a number from 0 (inclusive) to 1 (exclusive)
 * @returns {number[][]}        a new board
 */
export function spawn(board, rng = Math.random) {
	let i = 0;
	let emptyCells = [];
	let empty = true;
	for (i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] === 0) {
				empty = false;
				emptyCells.push([i, j]);
			}
		}
	}
	// return the original board if there are no empty cells
	if (empty) return board.map((row) => [...row]);
	
	const index = Math.floor(rng() * emptyCells.length);
	const value = rng() < 0.5 ? 2 : 4;

	const newBoard = board.map((row) => [...row]);
	newBoard[emptyCells[index][0]][emptyCells[index][1]] = value;

	return newBoard;
}
