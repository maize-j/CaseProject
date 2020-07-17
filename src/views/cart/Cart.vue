<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <Scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true">
      <cart-goods-item :goods="goodsList"></cart-goods-item>
    </Scroll>
  </div>
</template>

<script>
  import CartNavBar from "./childrenComponents/CartNavBar";
  import CartGoodsItem from "./childrenComponents/CartGoodsItem";

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

      },
      created() {
          this.goodsList = this.$store.state.cartList
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
    position: relative;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
