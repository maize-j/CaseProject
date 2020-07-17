<template>
    <div class="cart-goods-item" v-for="item in goods">
      <cart-good-list-item :goodItem="item"></cart-good-list-item>
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
        CartGoodListItem
      }
    }
</script>

<style scoped>

</style>
