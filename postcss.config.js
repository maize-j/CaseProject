module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth: 375,  //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,  //视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5,  //指定px转换为视窗单位值得小鼠位数（很多时候无法整除）
      viewportUnit: 'vw',  //指定需要转换成得视窗单位，建议使用vw
      //指定不需要转换的类
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],
      minPixelValue: 1,  //小于或等于1px不转换为视窗单位
      mediaQuery: false,  //允许再媒体查询中转换px
      exclude:[/^TabBar/]
    },
  }
}

//在js中使用正则：/正则相关规则/
//在exclude中存放的元素必须是正则表达式
//按照排除的文件写对应的正则：
//正则的规则：
//1）/^abc/：表示匹配的内容，必须是按照什么内容开头，这里是指以abc开头
//2）/abc$/：表示匹配的内容必须以什么内容结尾，这里指以abc结尾
