<template>
  <div class="check-button" :class="{checked : isChecked}" @click="checkButnClick">
    <img src="~assets/img/cart/tick.svg"/>
  </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props:{
          isChecked:{
            type:Boolean,
            default:false
          }
      },
      methods:{
        checkButnClick(){
          this.$emit('checkButnClick')
          // console.log(this.isChecked);
        }
      }
    }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 1px solid #C0C0C0;
  }
  .checked{
    background-color: var(--color-tint);
  }
</style>
