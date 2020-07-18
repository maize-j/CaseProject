<template>
  <div class="cart-goods-item">
    <cart-good-list-item class="cart-goods-items" v-for="(item,index) in goods"
                         :key="index"
                         :good-item="item"></cart-good-list-item>
  </div>
</template>

<script>
  import CartGoodListItem from "./CartGoodListItem";

  export default {
        name: "CartGoodsList",
      props:{
          goods:{
            type:Array,
            default(){
              return []
            }
          }
      },
      components:{
        CartGoodListItem,
      }
    }
</script>

<style scoped>
.cart-goods-item{
  width: 100%;
}
</style>
