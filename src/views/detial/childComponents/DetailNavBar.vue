<template>
    <div>
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg">
        </div>
        <div slot="center" class="titles">
          <div class="titles-item"
               v-for="(item,index) in titles"
               :class="{active : currentIndex==index}"
               @click="itemClick(index)">{{ item }}</div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
      components:{
        NavBar
      },
      data(){
          return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
          }
      },
      methods:{
        itemClick(index){
          this.currentIndex = index;
          this.$emit('titleClick',index)
        },
        backClick(){
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .titles{
    display: flex;
    font-size: 16px;
  }
  .titles div{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 10px;
  }
</style>
