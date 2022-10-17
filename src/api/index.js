// 使用说明
// scott
// 20220823 update
// 1、post请求使用data请求体 默认封装的get， 如果是get请求不需要写 method
// 2、put请求 示例
// put 也相当与post请求,如果报参数错误,就是接受参数的请求体错了post/put用data,get请求用params
// 修改用户id users/:uId/state/:type
// export const getEdit = (data) => request({
//     method: "put",
//     data,
//     url: "users/" + data.uid + "/state/" + data.type,
//   })
// 3、无参数示例
// export const order = () => request({ url: "xxxx" });

import request from "@/http/request";

// 用户登陆的接口  
 export const LoginInfo = (data) => request({ method: "post", url: '/permission/LoginInfo', data: data });
 
// 获取用户列表的接口 
 export const getMenuList = (params) => request({ url: '/permission/getMenuList', params });
 
