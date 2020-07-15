<template>
    <div v-if="Object.keys(shopInfo).length !== 0" class="shop-info">
      <div class="shop-info-show">
        <img :src="shopInfo.logo">
        <span>{{ shopInfo.name }}</span>
      </div>
      <div class="shop-info-detail">
        <div class="shop-info-sells">
          <div>{{ shopInfo.sells/10000 }}万</div>
          <div>总销量</div>
        </div>
        <div class="shop-info-goodsCount">
          <div>{{ shopInfo.goodsCount }}</div>
          <div>全部宝贝</div>
        </div>
        <div class="shop-info-score">
          <div class="shop-info-score-detail" v-for="item in shopInfo.score">
            <span class="shop-info-score-detail-name">{{ item.name }}</span>
            <span class="shop-info-score-detail-score">{{ item.score }}</span>
            <span class="grade" :class="{isBetter: item.isBetter}" v-if=item.isBetter>高</span>
            <span class="grade" :class="{isBetter: item.isBetter}" v-else>低</span>
          </div>
        </div>
      </div>
      <div class="div-enterShop">
        <button class="btn-enterShop" @click="btnClick">进店逛逛</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailShopInfo",
      data(){
        return{
          level:'低'
        }
      },
      components:{
      },
      props:{
          shopInfo:{
            type: Object,
            default(){
              return {}
            }
          }
      },
      methods:{
        btnClick(){

        }
      }
    }
</script>

<style scoped>
  .shop-info{
    box-shadow: 0 8px 10px -12px #888888;
  }
  .shop-info-show{
    display: flex;
    /*height: 80px;*/
    line-height: 45px;
    text-align: center;
  }
  .shop-info-show span{
    display: block;
    /*line-height: 80px;*/
  }
  .shop-info-show img{
    height: 45px;
    width: 45px;
    border-radius: 50%;
    margin-left: 5px;
  }
  .shop-info-show span{
    margin-left: 35px;
  }
  .shop-info-detail{
    display: flex;
    margin-top: 10px;
    text-align: center;
    /*height: 100px;*/
  }
  .grade{
    background-color:darkseagreen;
    font-size: 15px;
    height: 17px;
    margin-top: 4px;
  }
  .shop-info-sells,.shop-info-goodsCount{
    width: 100px;
    margin-top: 10px;
  }
  .shop-info-sells div,.shop-info-goodsCount div{
    line-height: 30px;
  }
  .shop-info-goodsCount{
    border-right: 1px solid #C0C0C0;
  }
  .shop-info-score{
    margin-top: 10px;
  }
  .shop-info-score-detail{
    display: flex;
  }
  .shop-info-score-detail-name{
    display: block;
    width: 80px;
  }
  .shop-info-score-detail-score{
    display: block;
    width: 50px;
  }
  .shop-info-score-detail-name,.shop-info-score-detail-score{
    font-size: 15px;
    line-height: 25px;
  }
  .div-enterShop{
    text-align: center;
    line-height: 50px;
  }
  .btn-enterShop{
    background-color: #F5F5F5;
    width: 150px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #DCDCDC;
  }
  .isBetter{
    background-color: #ff5777;
  }
</style>
