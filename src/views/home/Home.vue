<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left"></div>
      <div slot="center"><h3>购物街</h3></div>
      <div slot="right"></div>
    </nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll"
            :probe-type="3" :pull-up-load="true"
            @pullingUp="mGetHomeGoods(currentType)">
      <home-swiper :cbanners="banners"></home-swiper>
      <home-recommend-view :crecommends="recommends"></home-recommend-view>
      <home-week-feature></home-week-feature>
      <tab-controller class="tab-controller"
                      :titles="titles"
                      @tabClick="tabClick"></tab-controller>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--原生的组件可以直接使用click属性，但是自定义方法必须在click后加上.native才能生效-->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childrenComponents/HomeSwiper";
  import HomeRecommendView from "./childrenComponents/HomeRecommendView";
  import HomeWeekFeature from "./childrenComponents/HomeWeekFeature";

  import NavBar from "components/common/navbar/NavBar";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
      name: "Home",
      components:{
        HomeRecommendView,
        NavBar,
        HomeSwiper,
        HomeWeekFeature,
        TabController,
        GoodsList,
        Scroll,
        BackTop
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
        currentType:'pop',
        isShow:false
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
          // console.log(res);
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

          this.$refs.scroll.finishPullUp()
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
      },
      //回到顶部
      backClick(){
        //通过refs的scroll拿到当前页面对应的scroll组件
        //当前页面的scroll组件是引用的Scroll子组件，在子组件的data中有scroll对象
        //因此可以通过this.$refs.scroll.scroll拿到子组件中的scroll对象
        //子组件中的scroll对象已被赋值为new BScroll，它有一个scrollTo方法，可以定位到确定的位置
        //scrollTo(x,y)
        // this.$refs.scroll.scroll.scrollTo(0,0)

        //Scroll组件内部封装了scrollTo方法，直接调用即可
        this.$refs.scroll.scrollTo(0,0)
      },
      //监听位置显示回到顶端
      contentScroll(position){
        // console.log(position);
        if(position.y < -800){
          this.isShow = true
        }else{
          this.isShow = false
        }
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
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
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /*.content{*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
