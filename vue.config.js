module.exports = {
    configureWebpack:{
        resolve:{
            //配置别名
            alias:{
                //默认已经配置
                // '@':'src'
                //项目需要的配置
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                //router一般情况下不用配置，因为router只会在main.js中引用
                // 'router':'@/router',
                //store同router一样，不会反复被引用，因此无需配置
                // 'store':'@/store',
                'views':'@/views',
            }
        }
    }
}