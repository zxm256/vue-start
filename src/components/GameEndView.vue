<template>
  <div v-show="end" class="container">
    <div class="msg">{{msg}}</div>
    <button @click.prevent="onRestart" class="restart">Restart</button>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  computed: {
    msg () {
      return this.board.won ? 'Win' : 'Game Over'
    },
    end () {
      return this.board.won || !this.board.canMove()
    }
  },
  methods: {
    onRestart () {
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(221, 221, 221, 0.5);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .msg {
    text-align: center;
    font-size: 55px;
    font-weight: bolder;
    color: #666;
  }
  .restart {
    background-color: #876;
    color: #fff;
    height: 40px;
    width: 200px;
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
</style>
