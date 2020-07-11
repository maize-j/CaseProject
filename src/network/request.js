import axios from 'axios'

export function request(config) {
        //1.创建axios实例
    const instance1 = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    //2.axios拦截器
    //2.1请求拦截
    instance1.interceptors.request.use(config=>{

        //2.1.1 config中的一些信息不符合服务器的要求
        //2.1.2 每次发送网络请求时，都希望在界面中显示一个请求的图标
        //2.1.3 某些网络请求，需要携带一些特殊的信息（比如登录token）
        return config
    },err=>{

    })

    //2.2 响应拦截
    instance1.interceptors.response.use(res=>{

        return res.data
    },err=>{

    })

    //发送真正的网络请求
    return instance1(config)
}
