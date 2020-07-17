import {debounce} from 'common/utils'
export const itemListerMixin = {
  data(){
    return{
      itemImgListener : null
    }
  },
  mounted(){
    let newRefresh = debounce(this.$refs.scroll.refresh(),100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    console.log('我是混入中的内容');
  }
}

//backTop小箭头的mixin
import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  data(){
    return {
      isShow:false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}
