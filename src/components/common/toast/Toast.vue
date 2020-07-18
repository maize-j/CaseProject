<template>
    <div v-show="isShow" class="toast">
      <div>{{ message }}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
      props:{
        //   message:{
        //     type:String,
        //     default:null
        //   },
        // isShow: {
        //   type: Boolean,
        //   default: false
        // }
      },
      data(){
          return{
            message:'',
            isShow:false
          }
      },
      methods:{
          showToast(message,duration=2000){
            this.message = message;
            console.log('toast:'+message);
            this.isShow = true;
            console.log(this.isShow);
            setTimeout(()=>{
              this.isShow = false
              this.message = ''
            },duration)
          }
      }
    }
</script>

<style scoped>
  .toast{
    padding: 5px 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    background-color: rgba(0,0,0,0.7);
    border-radius: 5px;
    z-index: 9;
  }
</style>
