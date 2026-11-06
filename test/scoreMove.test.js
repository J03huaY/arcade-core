import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreRowLeft } from '../src/move.js';
import { scoreMove } from '../src/index.js';

// scoreRowLeft: the points one row earns when it slides left

test('scoreRowLeft: no merges scores 0', () => {
	assert.equal(scoreRowLeft([2, 4, 8, 16]), 0);
});

test('scoreRowLeft: an empty row scores 0', () => {
	assert.equal(scoreRowLeft([0, 0, 0, 0]), 0);
});

test('scoreRowLeft: one merge scores the new tile', () => {
	assert.equal(scoreRowLeft([2, 2, 0, 0]), 4);
});

test('scoreRowLeft: merges across empty cells', () => {
	assert.equal(scoreRowLeft([2, 0, 0, 2]), 4);
});

test('scoreRowLeft: two merges add up', () => {
	assert.equal(scoreRowLeft([2, 2, 4, 4]), 4 + 8);
});

test('scoreRowLeft: three equal tiles merge only once', () => {
	assert.equal(scoreRowLeft([2, 2, 2, 0]), 4);
});

test('scoreRowLeft: four equal tiles merge twice', () => {
	assert.equal(scoreRowLeft([2, 2, 2, 2]), 4 + 4);
});

test('scoreRowLeft: a new tile does not merge again', () => {
	// 4 + 4 -> 8, and that new 8 must not merge with the old 8
	assert.equal(scoreRowLeft([4, 4, 8, 0]), 8);
});

test('scoreRowLeft: does not modify the row that is passed in', () => {
	const row = [2, 2, 4, 4];
	scoreRowLeft(row);
	assert.deepEqual(row, [2, 2, 4, 4]);
});

// scoreMove: the points a whole move earns

// Rows merge to 4 + 16 = 20 points; columns merge to 4 + 4 = 8 points.
const board = [
	[2, 2, 0, 0],
	[0, 0, 0, 0],
	[4, 0, 0, 0],
	[4, 8, 8, 0]
];

test('scoreMove: left adds up every row', () => {
	assert.equal(scoreMove(board, 'left'), 20);
});

test('scoreMove: right adds up every row', () => {
	assert.equal(scoreMove(board, 'right'), 20);
});

test('scoreMove: up adds up every column', () => {
	assert.equal(scoreMove(board, 'up'), 8);
});

test('scoreMove: down adds up every column', () => {
	assert.equal(scoreMove(board, 'down'), 8);
});

test('scoreMove: a move with no merges scores 0', () => {
	const noMerges = [
		[2, 4, 8, 16],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	assert.equal(scoreMove(noMerges, 'left'), 0);
	assert.equal(scoreMove(noMerges, 'down'), 0);
});

test('scoreMove: throws on an unknown direction', () => {
	assert.throws(() => scoreMove(board, 'diagonal'), /Unknown direction/);
});

test('scoreMove: does not modify the board that is passed in', () => {
	const copy = board.map((row) => [...row]);
	for (const direction of ['left', 'right', 'up', 'down']) {
		scoreMove(board, direction);
	}
	assert.deepEqual(board, copy);
});
