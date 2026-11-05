import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canMove, hasMoves } from '../src/index.js';

const stuckAtTop = [
	[2, 4, 8, 16],
	[4, 8, 16, 32],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

const fullNoMerges = [
	[2, 4, 2, 4],
	[4, 2, 4, 2],
	[2, 4, 2, 4],
	[4, 2, 4, 2]
];

test('canMove is false when tiles are packed against that edge with no merges', () => {
	assert.equal(canMove(stuckAtTop, 'up'), false);
	assert.equal(canMove(stuckAtTop, 'left'), false);
	assert.equal(canMove(stuckAtTop, 'right'), false);
});

test('canMove is true when tiles can slide into empty cells', () => {
	assert.equal(canMove(stuckAtTop, 'down'), true);
});

test('canMove is true when two tiles can merge even with no empty cells', () => {
	const full = [
		[2, 2, 4, 8],
		[4, 8, 16, 32],
		[8, 16, 32, 64],
		[16, 32, 64, 128]
	];
	assert.equal(canMove(full, 'left'), true);
	assert.equal(canMove(full, 'up'), false);
});

test('canMove does not modify the board that is passed in', () => {
	const copy = stuckAtTop.map((row) => [...row]);
	canMove(stuckAtTop, 'down');
	assert.deepEqual(stuckAtTop, copy);
});

test('hasMoves is true when there is an empty cell', () => {
	assert.equal(hasMoves(stuckAtTop), true);
});

test('hasMoves is true on a full board with one possible merge', () => {
	const full = fullNoMerges.map((row) => [...row]);
	full[3][3] = 4;
	assert.equal(hasMoves(full), true);
});

test('hasMoves is false on a full board with no merges: game over', () => {
	assert.equal(hasMoves(fullNoMerges), false);
});
