<template>
    <div v-if="Object.keys(shopInfo).length !== 0">
      <div >
        <img :src="shopInfo.logo">
        <span>{{ shopInfo.title }}</span>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
</template>

<script>
    export default {
        name: "DetailShopInfo",
      props:{
          shopInfo:{
            type: Object,
            default(){
              return {}
            }
          }
      }
    }
</script>

<style scoped>

</style>
