<template>
  <div class="category-menus">
    <scroll class="category-scroll">
      <div class="category-menu"
           v-for="(item1,index) in categoryMenus"
           :class="{isActive:index==currentIndex}"
           @click="menuListClick(index)">
        <div class="category-menu-list" >
          {{item1.title}}
        </div>
      </div>
    </scroll>
  </div>


</template>

<script>

  import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "CategoryMenu",
      data(){
          return{
            currentIndex:-1
          }
      },
      components:{
        Scroll
      },
      props:{
          categoryMenus:{
            type:Array,
            default(){
              return []
            }
          },
        subCategoryList:{
          default(){
            return []
          }
        }
      },
      methods:{
        menuListClick(index){
          this.currentIndex = index
          this.$emit('menuListClick',index)
        }
      }
    }
</script>

<style scoped>
  .category-menus{
    height: 100vh;
    width: 90px;
    position: fixed;
  }
  .category-scroll{
    height: calc(100% - 44px - 49px);
  }
  .category-menu-list,.sub-category-menu-list{
    border-bottom: 1px solid #C0C0C0;
    line-height: 40px;
    text-align: center;
    background-color: #DCDCDC;
  }
  .isActive{
    color: var(--color-tint);
  }

</style>
