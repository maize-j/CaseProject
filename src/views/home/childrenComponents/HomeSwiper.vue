<template>
    <div>
      <swiper>
        <swiper-item v-for="item in cbanners">
          <a :href="item.link">
            <img :src="item.image">
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
      }
    }
</script>

<style scoped>

</style>
