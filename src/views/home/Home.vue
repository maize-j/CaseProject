<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left"></div>
      <div slot="center"><h3>购物街</h3></div>
      <div slot="right"></div>
    </nav-bar>
    <home-swiper :cbanners="banners"></home-swiper>
    <home-recommend-view :crecommends="recommends"></home-recommend-view>
    <home-week-feature></home-week-feature>
    <tab-controller class="tab-controller"
                    :titles="titles"
                    @tabClick="tabClick"></tab-controller>
    <goods-list :goods="showGoods"></goods-list>

  </div>
</template>

<script>
  import HomeSwiper from "./childrenComponents/HomeSwiper";
  import HomeRecommendView from "./childrenComponents/HomeRecommendView";
  import HomeWeekFeature from "./childrenComponents/HomeWeekFeature";

  import NavBar from "components/common/navbar/NavBar";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
      name: "Home",
      components:{
        HomeRecommendView,
        NavBar,
        HomeSwiper,
        HomeWeekFeature,
        TabController,
        GoodsList
      },
    data(){
      return{
        banners:[],
        recommends:[],
        titles: ['推荐','新款','精选'],
        goods:{
          'pop':{
            page: 0,
            list: []
          },
          'new':{
            page: 0,
            list: []
          },
          'sell':{
            page: 0,
            list: []
          }
        },
        currentType:'pop'
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求轮播图数据
      this.mGetHomeMultidata()
      //请求商品数据
      this.mGetHomeGoods('pop')
      this.mGetHomeGoods('new')
      this.mGetHomeGoods('sell')
    },
    methods:{
      /**
       * 网络请求相关方法
       */
      mGetHomeMultidata(){
        //请求多个数据
        getHomeMultidata().then(res=>{
          console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        });
      },
      mGetHomeGoods(type){
        //请求商品数据
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          //...语法是将数组解析再一次push到目标数组中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
      /**
       * 时间监听相关的方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell'
        }
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

  /*  固定导航栏*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .tab-controller{
    position: sticky;
    top: 44px;
    z-index: 1;
  }
</style>
