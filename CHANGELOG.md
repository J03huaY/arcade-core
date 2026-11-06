# Changelog

All notable changes to this package are listed here. Versions follow
[Semantic Versioning](https://semver.org/).

## 0.2.0

### Added

- `scoreMove(board, direction)` returns the points a move earns: the sum of every tile created by
  a merge. It does not change the board, so call it before `move`.

No existing function changed, so code written for 0.1.0 works unchanged.

## 0.1.0 – 2026-11-05

First release.

### Added

- `move(board, direction)` slides and merges tiles left, right, up or down.
- `spawn(board, rng)` adds a `2` or `4` (50% each) to a random empty cell, with an optional `rng`
  for repeatable games.
- `canMove(board, direction)` tells whether a move would change the board.
- `hasMoves(board)` tells whether any move is left, which is `false` when the game is over.
