<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
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
      console.log(1);
      if (!this.food.count) {
        // 按照注释的写法是无法监听本来没有的属性的，所以需要使用set属性
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
  .cart-decrease
    display: inline-block
    padding: 6px
    transition: all 0.4s linear
    .inner
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
    &.move-enter-active, &.move-leave-active
      transition: all 0.5s linear
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        transition: all 0.5s
        opacity: 1
        transform: rotate(0deg)
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        opacity: 0
        transform: rotate(180deg)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .cart-add
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
</style>
