<template>
    <div class="home-recommend">
      <div v-for="item in crecommends">
        <a :href="item.link" class="recommend-item">
          <img :src="item.image" class="recommend-img"/>
          <div>{{ item.title }}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommendView",
      props:{
          crecommends:{
            type:Array,
            default() {
              return [];
            }
          }
      }
    }
</script>

<style scoped>
  .home-recommend{
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 14px;
    padding: 10px 0 10px;
    border-bottom: solid 8px #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-img{
    width: 85%;
    padding-bottom: 5px;
  }
</style>
