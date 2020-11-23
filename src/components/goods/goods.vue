<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          :class="{ current: currentIndex === index }"
          @click="selectMenu(index)"
        >
          <div class="menu-item-inner">
            <span class="text border-1px-bottom">
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
              {{ item.name }}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="foods-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li
              class="food-item border-1px-bottom"
              v-for="(food, index) in item.foods"
              :key="index"
            >
              <div class="icon">
                <img class="icon-img" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span>月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" />
  </div>
</template>

<script>
import BSscroll from 'better-scroll';
import goodsApi from '@/api/goods.js';
import shopcart from '@/components/shopcart/shopcart.vue';
import cartcontrol from '@/components/cartcontrol/cartcontrol';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 同时需要判断数组下标越界问题
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    goodsApi.getlist().then(res => {
      if (res.data.errno === ERR_OK) {
        this.goods = res.data.data;
        console.log(this.goods);
        // 该方法为vue渲染完成后的方法
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu(index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        'food-list-hook'
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.menuScroll = new BSscroll(this.$refs.menuWrapper, { click: true });
      // 开启实时监听滚动位置
      this.foodsScroll = new BSscroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      // 实时监听位置
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = -Math.round(pos.y);
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        'food-list-hook'
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0, len = foodList.length; i < len; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.goods
  display: flex
  overflow: hidden
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background-color: #f3f5f7
    .menu-item
      width: 80px
      min-height: 54px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .text
          &:after
            border-top: 0px
      .menu-item-inner
        display: table
        margin: auto
        min-height: 54px
        line-height: 14px
      .text
        display: table-cell
        width: 56px
        margin: auto
        vertical-align: middle
        border-1px-bottom(rgba(7, 17, 27, 0.1))
        font-size: 12px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 100%
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
  .foods-wrapper
    flex: 1
    // overflow-y: scroll
    .foods-list
      .title
        padding-left: 14px
        height: 36px
        background-color: #f3f5f7
        font-size: 12px
        line-height: 36px
        color: rgb(147, 153, 159)
        // border-2px-left(#d9dde1)
        border-left: 2px solid #d9dde1
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px-bottom(rgba(7, 17, 27, 0.1))
        &:last-child
          margin-bottom: 0
          &:after
            display: none
        .icon
          flex: 0 0 57px
          height: 57px
          margin-right: 10px
          .icon-img
            width: 100%
            // height: 100%
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            span:first-child
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
