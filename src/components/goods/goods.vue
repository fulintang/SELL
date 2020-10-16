<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
import goodsApi from '@/api/goods.js';
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    goodsApi.getlist().then(res => {
      if (res.data.errno === ERR_OK) {
        this.goods = res.data.data;
        console.log(this.goods);
      }
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.goods
  background-color: red
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
  .foods-wrapper
    flex: 1
    background-color: blue
</style>
