<template>
    <div>
      <swiper>
        <swiper-item v-for="item in cbanners">
          <a :href="item.link">
            <img :src="item.image" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
    export default {
      name: "HomeSwiper",
      props:{
        cbanners:{
          type:Array,
          default(){
            return[]
          }
        }
      },
      components:{
        Swiper,
        SwiperItem
      },
      data(){
        return{
          isLoad:false
        }
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){
            this.$emit('swiperImageLoad')
            this.isLoad = true
          }
        }
      }
    }
</script>

<style scoped>

</style>
