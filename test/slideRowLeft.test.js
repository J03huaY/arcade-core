import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slideRowLeft } from '../src/move.js';

test('slides tiles to the left past empty cells', () => {
	assert.deepEqual(slideRowLeft([0, 0, 0, 2]), [2, 0, 0, 0]);
	assert.deepEqual(slideRowLeft([0, 2, 0, 4]), [2, 4, 0, 0]);
});

test('merges two equal neighbours', () => {
	assert.deepEqual(slideRowLeft([2, 2, 0, 0]), [4, 0, 0, 0]);
});

test('merges across an empty cell', () => {
	assert.deepEqual(slideRowLeft([2, 0, 2, 4]), [4, 4, 0, 0]);
});

test('merges each tile only once: 2 2 2 2 becomes 4 4', () => {
	assert.deepEqual(slideRowLeft([2, 2, 2, 2]), [4, 4, 0, 0]);
});

test('a freshly merged tile does not merge again: 4 4 8 becomes 8 8', () => {
	assert.deepEqual(slideRowLeft([4, 4, 8, 0]), [8, 8, 0, 0]);
});

test('merges the leftmost pair first: 2 2 2 becomes 4 2', () => {
	assert.deepEqual(slideRowLeft([2, 2, 2, 0]), [4, 2, 0, 0]);
});

test('leaves a row with no possible move unchanged', () => {
	assert.deepEqual(slideRowLeft([2, 4, 2, 4]), [2, 4, 2, 4]);
	assert.deepEqual(slideRowLeft([0, 0, 0, 0]), [0, 0, 0, 0]);
});

test('does not modify the row that is passed in', () => {
	const row = [2, 2, 0, 4];
	slideRowLeft(row);
	assert.deepEqual(row, [2, 2, 0, 4]);
});
