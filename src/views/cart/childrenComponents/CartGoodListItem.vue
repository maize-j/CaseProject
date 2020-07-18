<template>
    <div class="cart-good-item">
      <div class="item-selector">
        <CheckButton @checkButnClick="checkedChange" :isChecked="goodItem.checked"></CheckButton>
      </div>
      <div class="item-img">
        <img :src="goodItem.image" alt="商品图片"/>
      </div>
      <div class="item-info">
        <div class="item-title">{{ goodItem.title }}</div>
        <div class="item-desc">{{ goodItem.desc }}</div>
        <div class="info-bottom">
          <div class="item-price left">￥{{ goodItem.price }}</div>
          <div class="item-count right">×{{ goodItem.count }}</div>
        </div>
      </div>
    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

    export default {
        name: "CartGoodListItem",
      props:{
          goodItem:{
            type:Object,
            default(){
              return {}
            }
          }
      },
      components:{
          CheckButton
      },
      methods:{
        checkedChange(){
          this.goodItem.checked = !this.goodItem.checked
          // console.log('goodItem.checked:'+this.goodItem.checked);
        }
      }
    }
</script>

<style scoped>
  .cart-good-item{
    width: 375.2px;
    /*width: 100%;*/
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price{
    color: orangered;
  }
</style>
