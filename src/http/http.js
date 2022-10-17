//根据实际情况修改

import axios from "axios";
import { ElMessage } from "element-plus";
// 导入配置的环境变量url
import baseURL from "./baseURL";
// 导入路由，没有this，使用路由实例跳转
import router from "@/router/index";

// 开启loading
// .....看是否需要

// 创建axios实例
const http = axios.create({
  baseURL, 
  timeout: 6000,
  // withDirectives: true, // 是否携带cookies
});
// 请求拦截
http.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理 config是axios的配置对象
    // console.log(config);

    //  携带token
    config.headers["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token")) || null;
      
    return config;
  },
  (err) => {
    throw new Error(err);
  }
);
 
// 响应拦截
http.interceptors.response.use(
  (res) => {
    // 在返回响应之前做一些处理 res是axios的配置对象
    console.log(res);
 
    // 关闭loading
    // .....待补充

    // 根据后台状态码统一封装提示信息 不需要在页面接口在单独写
    
    switch (res.status) {
      case 401:
        ElMessage({
          showClose: true,
          message: "未授权",
          type: "error",
        });
        //未授权跳转到login
        router.push("/login"); 
        break;
        case 500:
        ElMessage({
          showClose: true,
          message: "服务器内部错误",
          type: "error",
        });
        break;
       default:

         break;

    }
    
    // 根据接口返回的数据嵌套结构来返回 ，再议....
    return res;
  },
  (err) => {
    throw new Error(err);
  }
);
export default http;