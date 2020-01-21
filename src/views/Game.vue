<template>
  <div class="board">
    <div v-for="(row, index) in board.tiles" :key="index">
      <tile v-for="t in row" :key="t.id" :tile="t"></tile>
    </div>
    <game-end-view @reset="onReset" :board="board"></game-end-view>
  </div>
</template>

<script>
import Tile from '../components/Tile'
import { Board } from '../common/Board'
import GameEndView from '../components/GameEndView'
export default {
  data () {
    return {
      board: new Board()
    }
  },
  mounted () {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  },
  methods: {
    handleKeyDown (event) {
      if (this.board.won) {
        return
      }
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
        this.board.move(event.keyCode - 37)
      }
    },
    onReset () {
      this.board = new Board()
    }
  },
  components: {
    Tile,
    GameEndView
  }
}
</script>
<style scoped>
  .board {
    width: 440px;
    height: 440px;
    padding: 5px;
    background-color: #baa;
    border-radius: 7px;
    outline: none;
    position: relative;
  }
</style>
