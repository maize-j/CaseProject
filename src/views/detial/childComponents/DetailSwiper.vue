<template>
    <div>
      <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages">
          <img :src="item"/>
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
        name: "DetailSwiper",
      props:{
          topImages:{
            type:Array,
            default(){
              return []
            }
          }
      },
      components:{
          Swiper,
          SwiperItem
      }
    }
</script>

<style scoped>
  .detail-swiper{
    height: 350px;
    overflow: hidden;
  }
</style>
