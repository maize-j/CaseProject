<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goodsInfo"></detail-base-info>
    <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
  </div>
</template>

<script>
    import DetailNavBar from "./childComponents/DetailNavBar";
    import DetailSwiper from "./childComponents/DetailSwiper";
    import DetailBaseInfo from "./childComponents/DetailBaseInfo";
    import DetailShopInfo from "./childComponents/DetailShopInfo";

    import {getDetail,GoodsInfo,Shop} from "network/detail";

    export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo
      },
      data(){
        return{
          iid : null,
          topImages:[],
          goodsInfo: {},
          shopInfo: {}
        }
      },
      created() {
          //保存所传入的商品iid
        this.iid = this.$route.params.iid
        // console.log(this.iid);
        //根据iid请求商品的详情数据
        getDetail(this.iid).then(res=>{
          // console.log(res);
          //获取商品轮播图
          this.topImages = res.result.itemInfo.topImages

          //获取商品详细信息
          this.goodsInfo = new GoodsInfo(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
          // console.log(this.goodsInfo);

          //获取店铺信息
          this.shopInfo = new Shop(res.result.shopInfo)
        })
      }
    }
</script>

<style scoped>

</style>
