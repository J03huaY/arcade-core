import { test } from 'node:test';
import assert from 'node:assert/strict';
import { move } from '../src/index.js';

const board = [
	[2, 0, 2, 4],
	[0, 4, 0, 4],
	[2, 2, 2, 2],
	[0, 0, 0, 8]
];

test('left', () => {
	assert.deepEqual(move(board, 'left'), [
		[4, 4, 0, 0],
		[8, 0, 0, 0],
		[4, 4, 0, 0],
		[8, 0, 0, 0]
	]);
});

test('right', () => {
	assert.deepEqual(move(board, 'right'), [
		[0, 0, 4, 4],
		[0, 0, 0, 8],
		[0, 0, 4, 4],
		[0, 0, 0, 8]
	]);
});

test('up', () => {
	assert.deepEqual(move(board, 'up'), [
		[4, 4, 4, 8],
		[0, 2, 0, 2],
		[0, 0, 0, 8],
		[0, 0, 0, 0]
	]);
});

test('down', () => {
	assert.deepEqual(move(board, 'down'), [
		[0, 0, 0, 0],
		[0, 0, 0, 8],
		[0, 4, 0, 2],
		[4, 2, 4, 8]
	]);
});

test('right keeps tiles in their original order: 2 4 _ _ becomes _ _ 2 4', () => {
	const row = [[2, 4, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	assert.deepEqual(move(row, 'right')[0], [0, 0, 2, 4]);
});

test('right merges from the right edge first: 2 2 2 becomes _ _ 2 4', () => {
	const row = [[2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	assert.deepEqual(move(row, 'right')[0], [0, 0, 2, 4]);
});

test('down merges each tile only once in a column of 2 2 2 2', () => {
	const column = [
		[2, 0, 0, 0],
		[2, 0, 0, 0],
		[2, 0, 0, 0],
		[2, 0, 0, 0]
	];
	assert.deepEqual(move(column, 'down'), [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[4, 0, 0, 0],
		[4, 0, 0, 0]
	]);
});

test('does not modify the board that is passed in', () => {
	const copy = board.map((row) => [...row]);
	move(board, 'left');
	move(board, 'up');
	assert.deepEqual(board, copy);
});

test('returns a new board, not the same array', () => {
	const result = move(board, 'left');
	assert.notEqual(result, board);
	result.forEach((row, r) => assert.notEqual(row, board[r]));
});
