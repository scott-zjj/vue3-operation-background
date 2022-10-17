import http from "./http";
// post使用data请求接收, get请求要使用params接收
// put 也相当与post请求,如果报参数错误,就是接受参数的请求体错了post/put用data,get请求用params
function request({ method = 'get', url, data = {}, params = {} }) {
    return http({
        method,
        url,
        data,
        params
    })
}
 
export default request;