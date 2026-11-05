import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from '../src/index.js';

/** Returns a fake rng that gives back the listed numbers in order. */
function fakeRng(...values) {
	let i = 0;
	return () => values[i++];
}

const countTiles = (board) => board.flat().filter((value) => value !== 0).length;

const board = [
	[2, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 4]
];

test('picks the cell from rng: 0 means the first empty cell', () => {
	const result = spawn(board, fakeRng(0, 0));
	assert.equal(result[0][1], 2);
});

test('picks the cell from rng: 0.99 means the last empty cell', () => {
	const result = spawn(board, fakeRng(0.99, 0));
	assert.equal(result[3][2], 2);
});

test('places a 2 when the second rng value is below 0.5', () => {
	const result = spawn(board, fakeRng(0, 0.49));
	assert.equal(result[0][1], 2);
});

test('places a 4 when the second rng value is 0.5 or more', () => {
	const result = spawn(board, fakeRng(0, 0.5));
	assert.equal(result[0][1], 4);
});

test('adds exactly one tile and keeps the others', () => {
	const result = spawn(board, fakeRng(0.5, 0));
	assert.equal(countTiles(result), countTiles(board) + 1);
	assert.equal(result[0][0], 2);
	assert.equal(result[3][3], 4);
});

test('works with the default Math.random', () => {
	const result = spawn(board);
	assert.equal(countTiles(result), countTiles(board) + 1);
	assert.ok(result.flat().every((value) => [0, 2, 4].includes(value)));
});

test('returns the board unchanged when it is full', () => {
	const full = [
		[2, 4, 2, 4],
		[4, 2, 4, 2],
		[2, 4, 2, 4],
		[4, 2, 4, 2]
	];
	assert.deepEqual(spawn(full, fakeRng(0, 0)), full);
});

test('does not modify the board that is passed in', () => {
	const copy = board.map((row) => [...row]);
	spawn(board, fakeRng(0, 0));
	assert.deepEqual(board, copy);
});
