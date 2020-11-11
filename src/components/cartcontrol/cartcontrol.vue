<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
    console.log(this.food);
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 0
  .cart-decrease, .cart-add
    display: inline-block
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
  .cart-count
    display: inline-block
</style>
