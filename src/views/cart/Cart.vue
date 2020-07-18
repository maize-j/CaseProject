<template>
  <div class="cart">
    <!--顶部导航-->
    <cart-nav-bar></cart-nav-bar>
    <!--商品列表-->
    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true">

      <cart-goods-item :goods="goodsList"></cart-goods-item>

     </scroll>
    <!--底部工具栏-->
    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
  import CartNavBar from "./childrenComponents/CartNavBar";
  import CartGoodsItem from "./childrenComponents/CartGoodsList";
  import CartBottomBar from "./childrenComponents/CartBottomBar";

  import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "Cart",
      data(){
          return{
            goodsList:[]
          }
      },
      components:{
        CartGoodsItem,
        CartNavBar,
        Scroll,
        CartBottomBar
      },
      created() {
          this.goodsList = this.$store.state.cartList
      },
      activated() {
        this.$refs.scroll.refresh();
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
    position: relative;
    width: 100%;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
  }
  /*.cart-bottom-bar{*/
  /*  position: relative;*/
  /*  height: 40px;*/
  /*  background-color: #ff8198;*/
  /*}*/
</style>
