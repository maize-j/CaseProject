<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-info">
    <div class="detail-info-desc">{{ detailInfo.desc }}</div>
    <div class="detail-info-key">{{ detailInfo.key }}</div>
    <div v-for="item in detailInfo.imageList" class="detail-info-image">
      <img :src="item" class="detail-info-image-img" @load="imgLoad">
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailShow",
      data(){
        return{
          count:0,
          imageLength:0
        }
      },
      props:{
        detailInfo:{
          type:Object,
          default(){
            return {}
          }
        }
      },
      watch:{
        detailInfo(){
          this.imageLength = this.detailInfo.imageList.length
        }
      },
      methods:{
        imgLoad(){
          //判断所有的图片都加载完了，进行一次回调
          if(++this.count === this.imageLength){
            this.$emit('imageLoad')
          }
        },
      }
    }
</script>

<style scoped>
  .detail-info-desc{
    margin: 5px 20px;
    font-size: 12px;

  }
  .detail-info-key{
    margin: 10px 0 10px 20px;
    font-size: 15px;
    color: #333333;
  }
  .detail-info-image-img{
    width: 100%;
  }
</style>
