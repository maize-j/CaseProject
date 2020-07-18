<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navBar"></detail-nav-bar>
    <Scroll  class="content" ref="scroll"
             :probe-type="3" :pull-up-load="true"
             @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-show :detail-info="detailInfo" @imageLoad="imageLoad"></detail-show>
      <detail-good-params ref="params" :goods-params="goodsParams"></detail-good-params>
      <detail-comment-info ref="comments" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :goods="recommendsInfo"></goods-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
<!--    <toast :message="message" :isShow="toastShow"></toast>-->

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
    import DetailBottomBar from "./childComponents/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/content/goods/GoodsList";
    // import Toast from "components/common/toast/Toast";

    import {getDetail,getRecommend,GoodsInfo,Shop,DetailInfo,GoodsParams} from "network/detail";
    import {debounce} from 'common/utils'
    import {backTopMixin} from "common/mixin";

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
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // Toast
      },
      data(){
        return{
          iid : null,
          topImages:[],
          goodsInfo: {},
          shopInfo: {},
          detailInfo:{},
          goodsParams:{},
          commentInfo:{},
          recommendsInfo:[],
          themeTopYs:[],
          currentIndex:0,
          // message:'商品已添加进购物车',
          // toastShow:false
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
          // console.log(this.shopInfo);

          //获取商品展示的详细信息
          this.detailInfo = new DetailInfo(res.result.detailInfo)
          // console.log(this.detailInfo);

          //获取商品的参数信息
          this.goodsParams = new GoodsParams(res.result.itemParams.info,res.result.itemParams.rule)

          //获取评论信息
          if(res.result.rate.cRate !== 0){
            this.commentInfo = res.result.rate.list[0]
          }

          //这总情况下获取到的值依然可能出现错误
          //用于延迟执行一段代码，它将会在DOM更新循环结束之后执行延迟回调
          //因此nextTick中的代码在执行时，created中所拿到的数据已经完成渲染
          //所以此时所获取到的元素的offsetTop是有值的
          // this.$nextTick(()=>{
          //   //获取参数、评论、推荐的offsetTop值，便于点击详细商品页面的导航栏时，能够顺利跳转
          //   //未放在mounted中执行是因为，即使created中拿到数据，在执行mounted中的代码时，页面不一定渲染完成了
          //   this.themeTopYs.push(0);
          //
          //   //在$nextTick中，虽然对应的DOM已经渲染，但是图片可能依然没有加载完成
          //   //所以拿到的计算出的offsetTop也有可能不是准确的值
          //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          //   // console.log(this.themeTopYs);
          // })
        });

        //获取推荐信息
        getRecommend().then(res=>{
          this.recommendsInfo = res.data.list
          // console.log(this.recommendsInfo);
        })
      },
      mixins:[backTopMixin],
      methods:{
        imageLoad(){
          //在图片加载完成后，刷新scroll的高度
          this.$refs.scroll.refresh()

          //在此处计算offsetTop的值时，图片已加载完成
          // 且在detail-show中，未避免多次调用当前方法，在图片都加载完成后才将方法发射
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          // console.log(this.themeTopYs);
        },
        //点击导航跳转到对应区域
        titleClick(index){
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000);
        },

        contentScroll(position){

          //决定回到顶部箭头是否显示
          if(position.y < -800){
            this.isShow = true
          }else{
            this.isShow = false
          }

          //滚动位置和标题的级联变更
          //获取y值
          const positionY = -position.y
          //positionY跟标题的值进行对比
          for(let i in this.themeTopYs){
            if(this.currentIndex != i){
              if(i < this.themeTopYs.length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[parseInt(i)+1]){
                  this.currentIndex = i
                this.$refs.navBar.currentIndex = this.currentIndex
                // console.log('currentIndex'+this.$refs.navBar.currentIndex);
                //   console.log(this.currentIndex);
              }else if(i==this.themeTopYs.length-1 && positionY >= this.themeTopYs[i]){
                  this.currentIndex = i
                this.$refs.navBar.currentIndex = this.currentIndex
                // console.log('currentIndex'+this.$refs.navBar.currentIndex);
                // console.log(this.currentIndex);
              }
            }
          }
        },

        //加入购物车
        addCart(){
          //1.获取购物车需要展示的信息
          const good = {}
          good.image = this.topImages[0];
          good.title = this.goodsInfo.title;
          good.desc = this.goodsInfo.desc;
          good.price = this.goodsInfo.realPrice;
          good.iid = this.iid;

          //2.将商品添加到购物车
          // this.$store.commit('addCart',good)
          this.$store.dispatch('addCart',good).then(res=>{
            // console.log(res);
            this.$toast.showToast(res,1500)
            //在Toast中默认将duration设置为了2000毫秒，不输入duration时，时间为2000
            // this.$toast.showToast(res)
            // this.message = res;
            // this.toastShow = true;
            // setTimeout(()=>{
            //   this.toastShow = false
            //   this.message = ''
            // },1500)
            // console.log(res);
          })
        }
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
    bottom: 49px;
    /*bottom: 49px;*/
  }
</style>
