<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left"></div>
      <div slot="center"><h3>购物街</h3></div>
      <div slot="right"></div>
    </nav-bar>
    <home-swiper :cbanners="banners"></home-swiper>
    <home-recommend-view :crecommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childrenComponents/HomeSwiper";
  import HomeRecommendView from "./childrenComponents/HomeRecommendView";

  import {getHomeMultidata} from "network/home";

  export default {
      name: "Home",
      components:{
        HomeRecommendView,
        NavBar,
        HomeSwiper
      },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created() {
      //请求多个数据
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
