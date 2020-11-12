<template>
  <div class="cartcontrol">
    <div
      class="cart-decrease icon-remove_circle_outline"
      v-show="food.count>0"
      @click="decreaseCart"
    ></div>
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
  created() {},
  methods: {
    addCart() {
      if (!this.food.count) {
        // 监测不到
        // this.food.count = 1;
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart() {
      if (this.food.count > 0) this.food.count--;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 0
  .cart-decrease, .cart-add
    display: inline-block
    // vertical-align: top
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
</style>
