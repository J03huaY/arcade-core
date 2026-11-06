# @firefly13/arcade-core

Pure game logic for [2048](https://en.wikipedia.org/wiki/2048_(video_game)), written in plain
JavaScript.

Every function takes a board and returns a **new** board or a boolean. Nothing is changed in
place, and nothing touches the DOM, a framework, or the browser, so it runs anywhere JavaScript
runs: Node, the browser, or a test runner.

## Install

```bash
npm install @firefly13/arcade-core
```

Requires Node 18 or later. The package is an ES module.

## Quick start

```js
import { move, scoreMove, spawn, canMove, hasMoves } from '@firefly13/arcade-core';

let board = [
	[2, 0, 2, 4],
	[0, 0, 0, 0],
	[0, 4, 0, 4],
	[0, 0, 0, 0]
];
let score = 0;

if (canMove(board, 'left')) {
	score += scoreMove(board, 'left'); // 4 + 8 = 12
	board = move(board, 'left');
	board = spawn(board);
}

if (!hasMoves(board)) {
	console.log('Game over');
}
```

## The board

A board is an array of rows. Each row is an array of numbers, and `0` means an empty cell.

```js
const board = [
	[2, 0, 0, 0], // top row
	[0, 0, 0, 0],
	[0, 0, 4, 0],
	[0, 0, 0, 0] // bottom row
];
```

`board[row][column]` is the tile at that position, so `board[2][2]` is `4` above.

A direction is one of the strings `'left'`, `'right'`, `'up'` or `'down'`.

## API

### `move(board, direction)`

Slides every tile as far as it can go in `direction`, merges equal neighbours, and returns the
new board.

Each tile merges at most once per move, and tiles closest to the edge you are moving towards
merge first:

```js
move([[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 'left')[0];
// [4, 4, 0, 0]   (not [8, 0, 0, 0])

move([[4, 4, 8, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 'left')[0];
// [8, 8, 0, 0]   (the new 8 does not merge again)

move([[2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 'right')[0];
// [0, 0, 2, 4]
```

Throws an `Error` if `direction` is not one of the four directions.

### `scoreMove(board, direction)`

Returns the points that moving in `direction` would earn, without changing the board. Every
merge earns the value of the new tile, so two `2`s merging into a `4` earn 4 points. A move with no
merges earns `0`.

Call it with the board **before** you move it:

```js
const board = [
	[2, 2, 4, 4],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

scoreMove(board, 'left'); // 12   (2 + 2 → 4, and 4 + 4 → 8)
scoreMove(board, 'up'); // 0    (nothing merges vertically)
```

It follows the same merge rules as `move`, so `[2, 2, 2, 2]` earns 8 (two 4s) and `[4, 4, 8, 0]`
earns 8 (the new 8 does not merge again).

Throws an `Error` if `direction` is not one of the four directions.

Added in 0.2.0.

### `spawn(board, rng = Math.random)`

Puts a new tile in a random empty cell and returns the new board. The new tile is a `2` or a `4`,
each with a 50% chance. If the board has no empty cells, it returns an unchanged copy.

```js
spawn([
	[2, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 4]
]);
// one of the 14 empty cells now holds a 2 or a 4
```

`rng` is an optional function that returns a number from 0 (inclusive) to 1 (exclusive), like
`Math.random`. Pass your own to control where tiles appear, for example with a seeded random
number generator so a game can be replayed. `spawn` calls it exactly twice:

1. **Which cell:** the empty cells are listed row by row, starting at the top left, and the one at
   index `Math.floor(rng() * emptyCells.length)` is chosen.
2. **Which value:** `2` if `rng() < 0.5`, otherwise `4`.

```js
const values = [0, 0.7];
const fakeRng = () => values.shift();

spawn(
	[
		[2, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],
	fakeRng
);
// [[2, 4, 0, 0], ...]   first empty cell, value 4
```

### `canMove(board, direction)`

Returns `true` if moving in `direction` would change the board, and `false` if nothing would
move or merge. In a game, only a move that changes the board should spawn a new tile.

```js
const board = [
	[2, 4, 8, 16],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

canMove(board, 'left'); // false
canMove(board, 'down'); // true
```

### `hasMoves(board)`

Returns `true` if any of the four directions would still change the board, and `false` when the
game is over.

```js
hasMoves([
	[2, 4, 2, 4],
	[4, 2, 4, 2],
	[2, 4, 2, 4],
	[4, 2, 4, 2]
]);
// false
```

## Development

```bash
npm test
```

Runs the tests in `test/` with Node's built-in test runner. There are no dependencies to install.

## License

MIT
