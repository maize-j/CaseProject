<template>
    <div class="cart-goods-item">
      <div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "CartGoodsItem",
      props:{
          goods:{
            type:Array,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>

</style>
