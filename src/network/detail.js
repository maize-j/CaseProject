import {request} from "./request";

export function getDetail(iid){
  return request({
    url: 'detail?iid='+iid
  })
}
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}

//商品信息
export class GoodsInfo {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

//商品详细信息
export class DetailInfo{
  constructor(detailInfo) {
    this.desc = detailInfo.desc
    this.imageList = detailInfo.detailImage[0].list
    this.key = detailInfo.detailImage[0].key
  }
}

//商品参数
export class GoodsParams {
  constructor(info,rule) {
    //注：image可能没有值（有些商品有值，有些商品没有值）
    this.image = info.image ? info.image[0]:'';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
//
// export class RecommendInfo {
//   constructor(info) {
//     this.show.img = info.item_url;
//     this.title = info.title;
//     this.price = info.price;
//     this.cfav = info.cfav
//   }
// }
