//防抖函数
export function debounce(func,delay){
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

//日期格式化
export function formatDate(date,fmt){

  //获取年份
  //正则表达式中：
  //y -> 表示一个y
  //y+ -> 表示1个或多个y
  //y* -> 表示0个或多个y
  //y? -> 表示0个或1个y
  if(/(y+)/.test(fmt)){
    //其中RegExp.$1代表所传入的字符串，例如是'yy'，将会被逗号后的内容替换
    //date.getFullYear()+''表示获取的年份，且转换为字符串类型
    //substr(4-RegExp.$1.length)截取部分，这里为substr(2)，表示截取后两位，例如2019，最终结果为19
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
  }

  //
  let o = {
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt;
}

//当小时，分钟，秒钟不足两位时，用0补齐为两位
function padLeftZero(str) {
  //例如str为3，拼接后为003，截取传入的字符串的长度，为1，那么将前一个0截取掉，剩下为03
  return ('00' + str).substr(str.length);
}
