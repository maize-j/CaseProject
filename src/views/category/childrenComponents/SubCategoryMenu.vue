<template>
  <div>
    <grid-view :cols="3" :line-space="10" :v-margin="20" v-if="subCategoryList">
      <div class="category-item" v-for="(item,index) in subCategoryList" :key="index">
        <a class="item" :href="item.link">
          <img class="category-item-img" :src="item.image" @load="imageLoad">
          <div class="category-item-text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
  </div>

</template>

<script>
  import GridView from "components/common/gridView/GridView";
    export default {
      name: "SubCategoryMenu",
      data(){
        return{
         isLoad:false
        }
      },
      components:{
        GridView
      },
      props:{
        subCategoryList:{
          type:Array,
          default(){
            return []
          }
        }
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){
            this.$emit('subImageLoad')
            this.isLoad = true
          }
        }
      }
    }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .category-item-img {
    width: 80%;
  }

  .category-item-text {
    margin-top: 15px;
  }
</style>
