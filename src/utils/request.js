import axios from "axios"
import qs from "querystring"


/**
 * 参考地址:https://tool.oschina.net/commons?type=5
 * http状态码
 *     2.x:成功  200
 *     3.x:成功  读取缓存
 *     4.x:失败  客户端错误  400 401  403  404
 *     5.x:失败  服务器错误  500 501  502  504  
 */

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("客户端请求中的语法错误");
            return;
        case 401:
            console.log("客户端未授权");
            return;
        case 403:
            console.log("服务器拒绝提供所请求的资源");
            return;
        case 404:
            console.log("资源定位失败，地址错误");
            return;
        case 500:
            console.log("常用的“服务器错误”状态");
            return;
        default:
            console.log(info);
            return;
    }
}

/**
 * 封装网络请求
 *     1. 创建请求对象
 *     2. 处理拦截器
 *     3. 处理错误信息
 *     4. Get和Post请求
 */

const instance = axios.create({
    // 公共配置
    timeout: 5000
})

/**
 * 配置拦截器
 */
instance.interceptors.request.use(
    config => {
        if (config.method === "post") {
            config.data = qs.stringify(config.data)
        }
        // 判断token是否存在，存在就添加到请求头上
        // const token = store.state.loginModule.userInfo.token;
        // if(token){
        //     config.headers.authorization = store.state.loginModule.userInfo.token;
        // }
        return config;
    },
    error => Promise.reject(error)
)


instance.interceptors.response.use(
    // 完成
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    // 未完成
    error => {
        const { response } = error;
        if (response) {
            errorHandle(response.status, response.info);
        } else {
            console.log("服务器请求中断");
        }
    }
)

export default instance