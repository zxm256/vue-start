<template>
  <span v-text="tile_label_text" class="tile" :class="tile_value_class"></span>
</template>

<script>
export default {
  props: {
    tile: {
      type: Object,
      required: true
    }
  },
  computed: {
    tile_label_text () {
      return this.tile.value === 0 ? '' : this.tile.value
    },
    tile_value_class () {
      return 'tile' + this.tile.value
    }
  }
}
</script>

<style scoped>
  .tile {
    width: 100px;
    height: 100px;
    margin: 5px;
    line-height: 90px;
    display: inline-block;
    font-size: 55px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    border-radius: 7px;
    font-family: "Clear Sans";
    user-select: none;
    cursor: default;
  }
  .tile0 {
    background-color: #dcb;
    color: #766;
  }
  .tile2 {
    background-color: #eee;
    color: #766;
  }
  .tile4 {
    background-color: #eec;
    color: #766;
  }
  .tile8 {
    color: #ffe;
    background-color: #fb8;
  }
  .tile16 {
    color: #ffe;
    background-color: #f96;
  }
  .tile32 {
    color: #ffe;
    background-color: #f75;
  }
  .tile64 {
    color: #ffe;
    background-color: #f53;
  }
  .tile128 {
    color: #ffe;
    background-color: #ec7;
    font-size: 45px;
  }
  .tile256 {
    color: #ffe;
    background-color: #ec6;
    font-size: 45px;
  }
  .tile512 {
    color: #ffe;
    background-color: #ec5;
    font-size: 45px;
  }
  .tile1024 {
    color: #fff;
    background-color: #ec3;
    font-size: 35px;
  }
  .tile2048 {
    color: #fff;
    background-color: #ec2;
    font-size: 35px;
  }
</style>
