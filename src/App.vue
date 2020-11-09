<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import sellerApi from '@/api/seller.js';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    sellerApi.getlist().then(res => {
      let data = res.data;
      if (data.errno === ERR_OK) {
        this.seller = data.data;
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
// vue-loader下的postcss帮我们做了CSS对各个浏览器的适应
// CSS规范， 先写布局， 宽高接上， 最后是color等属性
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
