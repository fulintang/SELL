<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          // 每一个成员都用来维护当前小球的状态,初始状态都是隐藏的
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      // 添加一个变量，用来存贮已经下落的小球
      dropBalls: [],
      fold: true // 购物车详情列表默认折叠
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      // 以选择的总数
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}`;
      } else if (this.totalPrice >= this.minPrice) {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else if (this.totalPrice >= this.minPrice) {
        return 'enough';
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    color: rgba(255, 255, 255, 0.4)
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background-color: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          background: #2b343c
          text-align: center
          &.highlight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
            color: #80858a
            &.highlight
              color: #fff
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align: top
        line-height: 24px
        margin-top: 12px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.4)
        font-size: 16px
        font-weight: 700
        &.highlight
          color: white
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        font-size: 10px
        font-weight: 700
    .content-right
      flex: 0 0 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        background: #2b333b
        &.not-enough
          background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
    .ball-container
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      .inner
        width: 15px
        height: 15px
        border-radius: 50%
        background-color: #00A0DC
        transition: all 1s linear
        &.drop-enter-active
            transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)
</style>
