<template>
    <div class="category-nav-bar">
      <nav-bar>
        <div slot="center">商品分类</div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "CategoryNavBar",
      components:{
          NavBar
      }
    }
</script>

<style scoped>
  .category-nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
    z-index: 9;
  }
  .category-nav-bar div{
    font-size: 20px;
    color: #fff;
  }
</style>
