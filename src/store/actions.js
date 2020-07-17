import {ADD_NEW_GOOD,ADD_OLD_GOOD} from './mutations_types'

export default {
  addCart(context,payload){
    //payload新添加的商品
    //利用find函数检查payload是否为cartList中已有函数
    let product = context.state.cartList.find(function (item) {
      return item.iid === payload.iid
    })

    //当product为true时，说明cartList已经有该商品，只需将商品的数量加一即可
    //注：在每一个新的payload添加到cartList时，都已经额外加了一个count属性，这里只需修改即可
    if(product){
      // product.count += 1
      context.commit(ADD_OLD_GOOD,product)
    }else{
      //当product为false时，说明cartList中没有该商品，那么为payload添加一个count属性，并将其值设置为1
      payload.count = 1
      context.commit(ADD_NEW_GOOD,payload)
    }
    // console.log(state.cartList);
  }
}
