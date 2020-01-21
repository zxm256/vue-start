let Tile = function () {
  this.value = 0;
  this.id = Tile.id++
};

Tile.prototype.setValue = function (v) {
  this.value = v
};
Tile.id = 0;
let Board = function () {
  this.tiles = [];
  for (let i = 0; i < Board.size; i++) {
    this.tiles[i] = this.createRow()
  }
  this.pickRandomTileAndSetValue();
  this.won = false
};
Board.size = 4;
Board.goal = 2048;
Board.prototype.createRow = function () {
  let res = [];
  for (let i = 0; i < Board.size; i++) {
    res.push(new Tile())
  }
  return res
};

Board.prototype.pickRandomTileAndSetValue = function () {
  let emptyCells = [];
  for (let r = 0; r < Board.size; ++r) {
    for (let c = 0; c < Board.size; ++c) {
      if (this.tiles[r][c].value === 0) {
        emptyCells.push({ r: r, c: c })
      }
    }
  }
  let index = ~~(Math.random() * emptyCells.length);
  let cell = emptyCells[index];
  let newValue = Math.random() < 0.1 ? 4 : 2;
  this.tiles[cell.r][cell.c].setValue(newValue)
};

Board.prototype.canMove = function () {
  let canMove = false;
  for (let r = 0; r < Board.size; r++) {
    for (let c = 0; c < Board.size; c++) {
      canMove |= (this.tiles[r][c].value === 0);
      if (r > 0) {
        canMove |= (this.tiles[r][c].value === this.tiles[r - 1][c].value)
      }
      if (c > 0) {
        canMove |= (this.tiles[r][c].value === this.tiles[r][c - 1].value)
      }
    }
  }
  return canMove
};

Board.prototype.moveLeft = function () {
  let changed = false;
  for (let r = 0; r < Board.size; r++) {
    let row = this.tiles[r].filter(t => t.value !== 0);
    if (row.length === 0) {
      continue
    }
    let res = [row.shift()];
    while (row.length !== 0) {
      let t = row.shift();
      if (res[res.length - 1].value === t.value) {
        res[res.length - 1].setValue(2 * t.value);
        this.won |= (res[res.length - 1] === Board.goal)
      } else {
        res.push(t)
      }
    }
    let len = res.length;
    while (len < Board.size) {
      res.push(new Tile());
      len++
    }
    changed |= !res.every((v, i) => v.value === this.tiles[r][i].value);
    this.tiles[r] = res
  }
  return changed
};

Board.prototype.move = function (direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  // move up equal to
  //  1. rorate left 1 time
  //  2. move tiles to left
  //  3. rotate left 3 times to recover
  for (let i = 0; i < direction; ++i) {
    this.tiles = rotateLeft(this.tiles)
  }
  let hasChanged = this.moveLeft();
  for (let i = direction; i < 4; ++i) {
    this.tiles = rotateLeft(this.tiles)
  }
  if (hasChanged) {
    this.pickRandomTileAndSetValue()
  }
};

let rotateLeft = function (matrix) {
  let rows = matrix.length;
  let columns = matrix[0].length;
  let res = [];
  for (let row = 0; row < rows; ++row) {
    res.push([]);
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1]
    }
  }
  return res
};

export { Board }
