import {ADD_NEW_GOOD,ADD_OLD_GOOD} from './mutations_types'
export default {
  //mutations的目的是修改state中的状态的数据
  //mutations中的每一个方法所完成的事情应该尽可能的单一
  //比较复杂的操作建议放在actions中（actions中不仅是进行异步操作）
  // addCart(state,payload){
  //   //payload新添加的商品
  //   //利用find函数检查payload是否为cartList中已有函数
  //   let product = state.cartList.find(function (item) {
  //     return item.iid === payload.iid
  //   })
  //
  //   //当product为true时，说明cartList已经有该商品，只需将商品的数量加一即可
  //   //注：在每一个新的payload添加到cartList时，都已经额外加了一个count属性，这里只需修改即可
  //   if(product){
  //     product.count += 1
  //   }else{
  //     //当product为false时，说明cartList中没有该商品，那么为payload添加一个count属性，并将其值设置为1
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  //   // console.log(state.cartList);
  // }

  [ADD_NEW_GOOD](state,payload){
    state.cartList.push(payload)
  },
  [ADD_OLD_GOOD](state,payload){
    payload.count++
  }
}
