<template>
    <div class="wrapper">
      <ul class="content">
        <button @click="btnClick">按钮</button>
        <h2>分类</h2>
        <h2>分类</h2>
        <h2>分类</h2>
        <h2>分类</h2>
        <h2>分类</h2>
        <h2>分类</h2>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表</li>
        <li>商品列表123</li>
      </ul>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
        name: "Catagory",
      data(){
        return{
          scroll:null
        }
      },
      methods:{
        btnClick(){
          console.log('btn被点击了');
        }
      },
      created() {
          //created函数是在Vue生命周期创建时调用
        // 因此在created函数中获取页面的标签元素要么为null，要么为undefine
      },
      mounted() {
        //BScroll中为标签内容，使用类或id选择器进行定位
        // new BScroll(document.querySelector('.content'))
        //实时的监听滚动的位置
        //默认情况下，BScroll是不可以实时的监听滚动位置的
        //要使用probeType进行侦测，见new BScroll中
        this.scroll = new BScroll('.wrapper',{
          //默认值为0，传入1表示明确的不侦测实时位置，
          //值为2时表示手指滚动过程中侦测，手指离开后的惯性滚动不侦测
          //值为3时表示只要有滚动都侦测，无论时手指滚动还是惯性滑动
          probeType: 2,
          //让可滑动区域内部的元素可以点击时，将click设为true
          click: true,
          //想要实现上拉加载更多时，将pullUpLoad设为true
          pullUpLoad:true

        })
        //滑动位置改变时触发，scroll监听位置变化,参数为实时的位置
        this.scroll.on('scroll',(position)=>{
          console.log(position);

        })
        //在一次上拉加载的动作后触发，这个时机一般用于去后端请求数据
        //pullingUp无参数
        this.scroll.on('pullingUp',()=>{
          console.log('上拉加载更多');

          //发送网络请求，请求更多页的数据

          //等数据请求完成，并且将新的数据展示出来后，要调用finishPullUp函数
          //否则，在进行第二次上拉加载更多时，将不会生效
          //为了能够顺利进行下一次的上拉加载更多，要调用finishPullUp
          setTimeout(()=>{
            this.scroll.finishPullUp()
          },2000)
        })
      },

    }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: #ff8198;

    /*overflow-y: scroll;*/
  }
</style>
