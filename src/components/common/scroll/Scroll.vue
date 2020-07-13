<template>
<!--  在父子组件中ref/children表示拿到子组件的值，parent表示拿到父组件的值
  如果ref是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      data(){
        return{
          scroll: null
        }
      },
      props:{
        probeType:{
          type:Number,
          default:0
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      methods:{
          //time的默认值为300
        scrollTo(x,y,time=300){
          this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
        },
        //finish
        finishPullUp(){
          this.scroll.finishPullUp()
        },
        //refresh
        refresh(){
          // console.log('-----');
          this.scroll && this.scroll.refresh && this.scroll.refresh()
        }
      },
      mounted() {
        //BScroll中为标签内容，使用类或id选择器进行定位
        // new BScroll(document.querySelector('.content'))
        //实时的监听滚动的位置
        //默认情况下，BScroll是不可以实时的监听滚动位置的
        //要使用probeType进行侦测，见new BScroll中
        this.scroll = new BScroll(this.$refs.wrapper,{
          //默认值为0，传入1表示明确的不侦测实时位置，
          //值为2时表示手指滚动过程中侦测，手指离开后的惯性滚动不侦测
          //值为3时表示只要有滚动都侦测，无论时手指滚动还是惯性滑动
          probeType: this.probeType,
          //让可滑动区域内部的元素可以点击时，将click设为true
          click: true,
          //想要实现上拉加载更多时，将pullUpLoad设为true
          pullUpLoad: this.pullUpLoad

        })

        //滑动位置改变时触发，scroll监听位置变化,参数为实时的位置
        this.scroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position)
        })

        //在一次上拉加载的动作后触发，这个时机一般用于去后端请求数据
        //pullingUp无参数
        if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
            //发送网络请求，请求更多页的数据
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
            //等数据请求完成，并且将新的数据展示出来后，要调用finishPullUp函数
            //否则，在进行第二次上拉加载更多时，将不会生效
            //为了能够顺利进行下一次的上拉加载更多，要调用finishPullUp
            // setTimeout(()=>{
            //   this.scroll.finishPullUp()
            // },2000)
          })
        }
      }
    }
</script>

<style scoped>

</style>
