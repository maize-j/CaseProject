<template>
    <div id="tab-controller">
      <div v-for="(item,index) in titles"
           class="tab-controller-item"
           :class="{active: index === currentIndex}"
            @click="itemClick(index)">
        <span>{{ item }}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabController",
      props:{
          titles:{
            type:Array,
            default(){
              return []
            }
          }
      },
      data(){
        return{
          currentIndex:0
        }
      },
      methods:{
        itemClick(index){
          this.currentIndex = index
          this.$emit('tabClick',index)
        }
      }
    }
</script>

<style scoped>
  #tab-controller{
    display: flex;
    text-align: center;
    line-height: 40px;
    background-color: #ffffff;
    /*box-shadow: 0 2px 0 rgba(100,100,100,0.8);*/
  }
  .tab-controller-item{
    flex: 1;
    height: 40px;
  }
  #tab-controller span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
