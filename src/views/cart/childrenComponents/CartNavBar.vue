<template>
    <div class="cart-nav-bar">
      <nav-bar>
        <div slot="center">购物车({{ cartLength }})</div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import {mapGetters} from 'vuex'

    export default {
        name: "CartNavBar",
      components:{
        NavBar,
      },
      computed:{
        // cartListLength(){
        //   return this.$store.getters.cartLength
        // }
        ...mapGetters(['cartLength'])
      }
    }
</script>

<style scoped>
  .cart-nav-bar{
    background-color: var(--color-tint);
  }
  .cart-nav-bar div{
    font-size: 20px;
    color: #f2f5f8;
  }
</style>
