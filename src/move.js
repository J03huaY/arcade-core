/**
 * Slides one row of tiles to the left and merges equal neighbours once each.
 * Does not change the row that is passed in.
 *
 * @param {number[]} row  tile values, 0 means an empty cell, e.g. [2, 0, 2, 4]
 * @returns {number[]}    a new row of the same length, e.g. [4, 4, 0, 0]
 */
export function slideRowLeft(row) {

	const length = row.length;
	const tiles = row.filter((tile) => tile !== 0);

	let i = 0;
	while (i < tiles.length - 1) {
		if (tiles[i] === tiles[i + 1]) {
			tiles[i] *= 2;
			tiles.splice(i + 1, 1);
		}
		i++;
	}
	
	while (tiles.length < length) {
		tiles.push(0);
	}


	return tiles;
}

function reverse(board) {
	return board.map((row) => [...row].reverse());
}

function transpose(board) {
	return board.map((row, i) => row.map((_, j) => board[j][i])); 
}

export function move(board, direction) {
	if (direction === 'left') return board.map(slideRowLeft);
	if (direction === 'right') return reverse(reverse(board).map(slideRowLeft));
	if (direction === 'up') return transpose(transpose(board).map(slideRowLeft));
	if (direction === 'down') return transpose(reverse(reverse(transpose(board)).map(slideRowLeft)));     
	throw new Error(`Unknown direction: ${direction}`);
}

export function scoreRowLeft(row) {
	const length = row.length;
	const tiles = row.filter((tile) => tile !== 0);

	let i = 0;
	let points = 0;
	while (i < tiles.length - 1) {
		if (tiles[i] === tiles[i+1]) {
			tiles[i] *= 2;
			tiles.splice(i + 1, 1);
			points += tiles[i];
		}
		i++;
	}
	return points;
}

export function scoreMove(board, direction) {
	let points = 0;
	let newBoard;
	if (direction === 'left') {
		newBoard = board;
	} else if (direction === 'right') {
		newBoard = reverse(board);
	} else if (direction === 'up') {
		newBoard = transpose(board);
	} else if (direction === 'down') {
		newBoard = reverse(transpose(board));
	} else throw new Error(`Unknown direction: ${direction}`);

	const scores = newBoard.map((row) => scoreRowLeft(row));
		for (let i = 0; i < scores.length; i++) {
			points += scores[i];
		}
		return points;
}
