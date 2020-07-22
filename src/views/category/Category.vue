<template>
    <div class="category">
      <category-nav-bar class="category-tab-bar"></category-nav-bar>
      <div class="category-content">
        <category-menu class="category-menu" :category-menus="categoryList" @menuListClick="menuListClick"></category-menu>
        <tab-controller :titles="titles"
                        @tabClick="categoryTabClick"
                        ref="tabController1"
                        class="category-tab-controller-show"
                        v-show="isTabShow"></tab-controller>
        <scroll class="content-scroll" ref="scroll"
                @scroll="contentScroll"
                :probe-type="3" :pull-up-load="true"
                @pullingUp="contentPullingUp">
          <sub-category-menu :subCategoryList="subCategoryList" @subImageLoad="subImageLoad"></sub-category-menu>
          <tab-controller :titles="titles"
                          class="category-tab-controller"
                          @tabClick="categoryTabClick"
                          ref="tabController2"></tab-controller>
          <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShow"></back-top>
      </div>
    </div>
</template>

<script>
  import CategoryNavBar from "./childrenComponents/CategoryNavBar";
  import CategoryMenu from "./childrenComponents/CategoryMenu";
  import SubCategoryMenu from "./childrenComponents/SubCategoryMenu";

  import Scroll from "components/common/scroll/Scroll";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";


  import {getCategory} from "network/category";
  import {debounce} from 'common/utils'
  import {getSubCategory, getSubCategoryDetail} from "../../network/category";
  //回到顶部箭头
  import {backTopMixin} from "common/mixin";

  export default {
      name: "Catagory",
    data(){
      return{
        categoryList:[],
        subCategoryList:[],
        titles:['综合','新品','销量'],
        goodList: {
          'pop':{
            list:[]
          },
          'sell':{
            list:[]
          },
          'new':{
            list:[]
          }
        },
        currentType:'pop',
        isTabShow:false,
        offSetTop:0,
        showGoods:[]
      }
    },
      components:{
        Scroll,
        CategoryNavBar,
        CategoryMenu,
        SubCategoryMenu,
        TabController,
        GoodsList
      },
    created() {
        //获取分类的菜单
      getCategory().then(res=>{
        // console.log(res);
        this.categoryList = res.data.category.list
      })

      //获取正在流行的子菜单
      getSubCategory(3627).then(res=>{
        this.subCategoryList = res.data.list
      })

      //获取正在流行的菜单明细
      this.subCategoryDetail(10062603);

    },
    mounted() {
      //图片加载完成的事件监听
      //使用防抖动函数控制刷新次数
      const refresh = debounce(this.$refs.scroll.refresh,500)

      //监听item中图片加载完成
      this.$bus.$on('detailItemImgLoad',()=>{
        // console.log('-----');
        // console.log('detailItemImgLoad');
        refresh()
      })

    },
    //回到顶部箭头混入
    mixins:[backTopMixin],
    methods:{
        //菜单选项
      menuListClick(index){
        getSubCategory(this.categoryList[index].maitKey).then(res=>{
          this.subCategoryList = res.data.list
          // console.log(this.subCategoryList);
        })

        this.subCategoryDetail(this.categoryList[index].miniWallkey)

        // console.log(this.showGoods);
      },
      //加载
      subCategoryDetail(miniWallkey){
        getSubCategoryDetail(miniWallkey,'pop').then(res=>{
          // console.log(res);
          this.goodList.pop.list = res

          this.showGoods = this.goodList.pop.list
          // console.log(this.showGoods);
        })
        getSubCategoryDetail(miniWallkey,'new').then(res=>{
          this.goodList.new.list = res
        })
        getSubCategoryDetail(miniWallkey,'sell').then(res=>{
          this.goodList.sell.list = res
        })
      },
      //子菜单图片加载
      subImageLoad(){
        this.offSetTop = this.$refs.tabController2.$el.offsetTop;
        // console.log(this.offSetTop);
      },
      //导航菜单选项
      categoryTabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabController1.currentIndex = index
        this.$refs.tabController2.currentIndex = index
        this.showGoods = this.goodList[this.currentType].list
      },
      //滚动位置
      contentScroll(position){

        //决定回到顶部箭头是否显示
        if(position.y < -800){
          this.isShow = true
        }else{
          this.isShow = false
        }

        if(position.y < -this.offSetTop){
          this.isTabShow = true
        }else{
          this.isTabShow = false
        }
      },
      //上拉加载更多
      contentPullingUp(){

      }
    }
  }
</script>

<style scoped>
  .category{
    height: 100vh;
  }
  .category-content{
    /*height: 100vh;*/
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  /*.category-menu{*/
  /*  height: calc(100% - 44px - 0);*/
  /*}*/
  /*.category-tab-bar{*/
  /*  z-index: 9;*/
  /*}*/
  .content-scroll{
    height: 100%;
    /*height: calc(100% - 0px - 0px);*/
    position: absolute;
    overflow: hidden;
    /*top: 44px;*/
    /*bottom: 49px;*/
    left: 90px;
  }
  .category-tab-controller,.category-tab-controller-show{
    background-color: #fff;
    height: 38px;
    z-index: 1;
  }
  .category-tab-controller{
    width: 100%;
  }
  .category-tab-controller-show{
    width: 285.2px;
    margin-left: 90px;
  }
</style>
