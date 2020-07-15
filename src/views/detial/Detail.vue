<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <Scroll  class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-show :detail-info="detailInfo" @imageLoad="imageLoad"></detail-show>
      <detail-good-params :goods-params="goodsParams"></detail-good-params>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    </Scroll>

  </div>
</template>

<script>
    import DetailNavBar from "./childComponents/DetailNavBar";
    import DetailSwiper from "./childComponents/DetailSwiper";
    import DetailBaseInfo from "./childComponents/DetailBaseInfo";
    import DetailShopInfo from "./childComponents/DetailShopInfo";
    import DetailShow from "./childComponents/DetailShow";
    import DetailGoodParams from "./childComponents/DetailGoodParams";
    import DetailCommentInfo from "./childComponents/DetailCommentInfo";

    import Scroll from "components/common/scroll/Scroll";

    import {getDetail,GoodsInfo,Shop,DetailInfo,GoodsParams} from "network/detail";

    export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailShow,
        DetailGoodParams,
        DetailCommentInfo
      },
      data(){
        return{
          iid : null,
          topImages:[],
          goodsInfo: {},
          shopInfo: {},
          detailInfo:{},
          goodsParams:{},
          commentInfo:{}
        }
      },
      created() {
          //保存所传入的商品iid
        this.iid = this.$route.params.iid
        // console.log(this.iid);
        //根据iid请求商品的详情数据
        getDetail(this.iid).then(res=>{
          console.log(res);
          //获取商品轮播图
          this.topImages = res.result.itemInfo.topImages

          //获取商品详细信息
          this.goodsInfo = new GoodsInfo(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
          // console.log(this.goodsInfo);

          //获取店铺信息
          this.shopInfo = new Shop(res.result.shopInfo)
          // console.log(this.shopInfo);

          //获取商品展示的详细信息
          this.detailInfo = new DetailInfo(res.result.detailInfo)
          console.log(this.detailInfo);

          //获取商品的参数信息
          this.goodsParams = new GoodsParams(res.result.itemParams.info,res.result.itemParams.rule)

          //获取评论信息
          if(res.result.rate.cRate !== 0){
            this.commentInfo = res.result.rate.list[0]
          }
        })
      },
      methods:{
        imageLoad(){
          //在图片加载完成后，刷新scroll的高度
          this.$refs.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    /*bottom: 49px;*/
  }
</style>
