import { move } from './move.js';

/**
 * @param {number[][]} board
 * @param {'left' | 'right' | 'up' | 'down'} direction
 * @returns {boolean}  true if moving in this direction would change the board
 */
export function canMove(board, direction) {
	if (JSON.stringify(move(board, direction)) !== JSON.stringify(board)) {
		return true;
	} 
	return false;
}

/**
 * @param {number[][]} board
 * @returns {boolean}  true if any direction would still change the board; false means game over
 */
export function hasMoves(board) {
	return canMove(board, 'left') || canMove(board, 'right') || canMove(board, 'up') || canMove(board, 'down');
}
