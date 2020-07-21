<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-controller :titles="titles"
                    @tabClick="tabClick"
                    ref="tabController1"
                    class="tab-controller"
                    v-show="isTabShow"></tab-controller>
    <scroll class="content" ref="scroll" @scroll="contentScroll"
            :probe-type="3" :pull-up-load="true"
            @pullingUp="contentPullingUp">
      <home-swiper :cbanners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :crecommends="recommends"></home-recommend-view>
      <home-week-feature></home-week-feature>
      <tab-controller :titles="titles"
                      @tabClick="tabClick"
                      ref="tabController2"></tab-controller>
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
  // import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from 'common/utils'
  // import {itemListerMixin} from 'common/mixin'
  import {backTopMixin} from 'common/mixin'

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
        // BackTop
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
        // isShow:false,
        tabOffSetTop: 0,
        isTabShow:false,
        saveY:0
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
    activated() {
      // console.log('activated');
      // console.log(this.saveY);
      //从其他页面跳转回首页时，回到离开时浏览位置
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      // console.log(this.$refs.scroll.scroll.y);
      //记录首页离开时的位置
      this.saveY = this.$refs.scroll.scroll.y
    },
    destroyed() {
      // console.log('destroyed');
    },
    //混入，会执行common/mixin.js中定义itemListerMixin中的mounted，在需要时，只需在页面引入混入即可
    // mixins:[itemListerMixin],
    mixins:[backTopMixin],
    mounted() {
        //图片加载完成的事件监听
        //使用防抖动函数控制刷新次数
        const refresh = debounce(this.$refs.scroll.refresh,500)

      //监听item中图片加载完成
      // this.$bus.$on('homeItemImgLoad',()=>{
      //   // console.log('-----');
      //   console.log('homeItemImgLoad');
      //   refresh()
      // })

      this.$bus.$on('homeItemImgLoad',()=>{
        // console.log('-----');
        // console.log('homeItemImgLoad');
        refresh()
      })

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
      contentPullingUp(){
        this.mGetHomeGoods(this.currentType)
      },
      /**
       * 事件监听相关的方法
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
        this.$refs.tabController1.currentIndex = index
        this.$refs.tabController2.currentIndex = index
      },
      //回到顶部
      // backClick(){
      //   //通过refs的scroll拿到当前页面对应的scroll组件
      //   //当前页面的scroll组件是引用的Scroll子组件，在子组件的data中有scroll对象
      //   //因此可以通过this.$refs.scroll.scroll拿到子组件中的scroll对象
      //   //子组件中的scroll对象已被赋值为new BScroll，它有一个scrollTo方法，可以定位到确定的位置
      //   //scrollTo(x,y)
      //   // this.$refs.scroll.scroll.scrollTo(0,0)
      //
      //   //Scroll组件内部封装了scrollTo方法，直接调用即可
      //   this.$refs.scroll.scrollTo(0,0)
      // },
      //监听位置显示回到顶端
      contentScroll(position){
        // console.log(position);
        //决定回到顶部箭头是否显示
        if(position.y < -800){
          this.isShow = true
        }else{
          this.isShow = false
        }

        //决定tabController是否吸顶（position: fixed）

        if(position.y < -this.tabOffSetTop){
          this.isTabShow = true
        }else{
          this.isTabShow = false
        }
      },
      //防抖函数的封装
      // debounce(func,delay){
      //   let timer = null
      //
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(()=>{
      //       func.apply(this,args)
      //     },delay)
      //   }
      // }

      //监听轮播图是否加载完成
      swiperImageLoad(){
        // console.log('swiperImageLoad');
        // console.log(this.$refs.tabController.$el.offsetTop);
        //切换条吸顶效果
        //获取tabController的offSet，但在本例中，tabController是一个组件，没有offSetTop属性
        //所有的组件都有一个$el属性，用于获取组件中的元素
        // console.log('offsettop'+this.$refs.tabController.$el.offsetTop);
        this.tabOffSetTop = this.$refs.tabController2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

  /*  使用浏览器原生滚动时固定导航栏*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 0;*/
  /*  z-index: 1;*/
  }
  .home-nav div{
    font-size: 20px;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .tab-controller{
    position: relative;
    z-index: 9;
  }
  /*.content{*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
