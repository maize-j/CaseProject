<template>
    <div class="cart-bottom-bar">
      <div class="check-content">
        <CheckButton class="check-button"
                     :is-checked="isSelectAll"
                     @click.native="checkAll"></CheckButton>
        <span>全选</span>
      </div>
      <div class="total-price">
        <span>合计:{{totalPrice}}</span>
      </div>
      <div class="cart-calculate">
        <span>去计算({{ totalLength }})</span>
      </div>
    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
        name: "CartBottomBar",
    components:{
       CheckButton
    },
    computed:{
      totalPrice(){
        return '￥'+this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue+item.price*item.count
        },0).toFixed(2)
      },
      totalLength(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preLength,item)=>{
          return preLength + item.count
        },0)
      },
      isSelectAll(){
        if(this.$store.state.cartList.length == 0){
          return false
        }else{
          return this.$store.state.cartList.filter(item=>{
            return item.checked
          }).length == this.$store.state.cartList.length
        }

      }
    },
    methods:{
      checkAll(){
        // console.log('checkAll');
        if(this.isSelectAll == false){
          // for(let i in this.$store.state.cartList){
          //   this.$store.state.cartList[i].checked = true
          // }
          this.$store.state.cartList.forEach(item => item.checked = true)
        }else{
          // for(let i of this.$store.state.cartList){
          //   i.checked = false
          // }
          this.$store.state.cartList.forEach(item => item.checked = false)
        }
        // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    height: 40px;
    line-height: 40px;
    /*position: relative;*/
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    /*vertical-align: bottom;*/
    background-color: #eee;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .check-button{
    height: 18px;
    width: 18px;
    line-height: 18px;
  }
  .check-content span{
    margin-left: 5px;
    font-size: 16px;
    color: #777777;
  }
  .total-price{
    margin-left: 30px;
  }
  .cart-calculate{
    width: 80px;
    position: fixed;
    right: 0;
    text-align: center;
    background-color: coral;
  }
</style>
