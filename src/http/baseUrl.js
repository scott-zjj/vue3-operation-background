
//根据实际情况修改配置

// baseURL = "/api";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
    // 开发环境  
    baseURL = "";
 
} else if (process.env.NODE_ENV === "production") {
    // 生产环境
    baseURL = "";
} else {
    // 测试环境
    baseURL = "";
}
export default baseURL;