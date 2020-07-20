<template>
    <div class="category">
      <category-nav-bar></category-nav-bar>
      <div class="content">
        <category-menu :category-menus="categoryList" @menuListClick="menuListClick"></category-menu>
        <scroll class="content-scroll">
          <sub-category-menu :subCategoryList="subCategoryList"></sub-category-menu>

        </scroll>
      </div>
    </div>
</template>

<script>
  import CategoryNavBar from "./childrenComponents/CategoryNavBar";
  import CategoryMenu from "./childrenComponents/CategoryMenu";
  import SubCategoryMenu from "./childrenComponents/SubCategoryMenu";

  import Scroll from "components/common/scroll/Scroll";

  import {getCategory} from "network/category";
  import {getSubCategory} from "../../network/category";

  export default {
      name: "Catagory",
    data(){
      return{
        categoryList:[],
        subCategoryList:[]
      }
    },
      components:{
        Scroll,
        CategoryNavBar,
        CategoryMenu,
        SubCategoryMenu
      },
    created() {
      getCategory().then(res=>{
        // console.log(res);
        this.categoryList = res.data.category.list
      })
    },
    methods:{
      menuListClick(maitKey){
        getSubCategory(maitKey).then(res=>{
          this.subCategoryList = res.data.list
          console.log(this.subCategoryList);
        })
      }
    }
  }
</script>

<style scoped>
  .category{
    height: 100vh;
  }
  .content{
    /*height: 100vh;*/
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .content-scroll{
    height: 100vh;
    position: absolute;
    left: 90px;
  }
</style>
