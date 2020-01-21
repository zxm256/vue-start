var Tile = function () {
  this.value = 0
  this.id = Tile.id++
}

Tile.prototype.setValue = function (v) {
  this.value = v
}
Tile.id = 0
var Board = function () {
  this.tiles = []
  for (var i = 0; i < Board.size; i++) {
    this.tiles[i] = this.createRow()
  }
  this.pickRandomTileAndSetValue()
  this.won = false
}
Board.size = 4
Board.goal = 2048
Board.prototype.createRow = function () {
  var res = []
  for (let i = 0; i < Board.size; i++) {
    res.push(new Tile())
  }
  return res
}

Board.prototype.pickRandomTileAndSetValue = function () {
  var emptyCells = []
  for (var r = 0; r < Board.size; ++r) {
    for (var c = 0; c < Board.size; ++c) {
      // eslint-disable-next-line eqeqeq
      if (this.tiles[r][c].value == 0) {
        emptyCells.push({ r: r, c: c })
      }
    }
  }
  var index = ~~(Math.random() * emptyCells.length)
  var cell = emptyCells[index]
  var newValue = Math.random() < 0.1 ? 4 : 2
  this.tiles[cell.r][cell.c].setValue(newValue)
}

Board.prototype.canMove = function () {
  var canMove = false
  for (var r = 0; r < Board.size; r++) {
    for (var c = 0; c < Board.size; c++) {
      canMove |= (this.tiles[r][c].value === 0)
      if (r > 0) {
        canMove |= (this.tiles[r][c].value === this.tiles[r - 1][c].value)
      }
      if (c > 0) {
        canMove |= (this.tiles[r][c].value === this.tiles[r][c - 1].value)
      }
    }
  }
  return canMove
}

Board.prototype.moveLeft = function () {
  var changed = false
  for (var r = 0; r < Board.size; r++) {
    var row = this.tiles[r].filter(t => t.value !== 0)
    if (row.length === 0) {
      continue
    }
    var res = [row.shift()]
    while (row.length !== 0) {
      var t = row.shift()
      // eslint-disable-next-line eqeqeq
      if (res[res.length - 1].value == t.value) {
        res[res.length - 1].setValue(2 * t.value)
        // eslint-disable-next-line eqeqeq
        this.won |= (res[res.length - 1] == Board.goal)
      } else {
        res.push(t)
      }
    }
    var len = res.length
    while (len < Board.size) {
      res.push(new Tile())
      len++
    }
    // eslint-disable-next-line eqeqeq
    changed |= !res.every((v, i) => v.value == this.tiles[r][i].value)
    this.tiles[r] = res
  }
  return changed
}

Board.prototype.move = function (direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  // move up equal to
  //  1. rorate left 1 time
  //  2. move tiles to left
  //  3. rotate left 3 times to recover
  for (var i = 0; i < direction; ++i) {
    this.tiles = rotateLeft(this.tiles)
  }
  var hasChanged = this.moveLeft()
  // eslint-disable-next-line no-redeclare
  for (var i = direction; i < 4; ++i) {
    this.tiles = rotateLeft(this.tiles)
  }
  if (hasChanged) {
    this.pickRandomTileAndSetValue()
  }
}

var rotateLeft = function (matrix) {
  var rows = matrix.length
  var columns = matrix[0].length
  var res = []
  for (var row = 0; row < rows; ++row) {
    res.push([])
    for (var column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1]
    }
  }
  return res
}

export { Board }
