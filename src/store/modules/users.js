import { LoginInfo } from "@/api/index.js";
import router from "@/router/router.js";
import { ElMessage } from "element-plus";

export default {
  namespaced: true,
  state: {
    UserInfo: {},
    token: sessionStorage.getItem("token") || "",
    isCollapse: true,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userinfo) {
      state.UserInfo = userinfo;
    },
    SetIsCollapse(state, isCollapse) {
      state.isCollapse = isCollapse;
    }
  },

  actions: {
    // 登录
    login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginInfo(userInfo)
          .then((res) => {
            console.log(res)
            console.log(res.data.data);
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("UserInfo", JSON.stringify(res.data.data));

            commit("setToken", res.data.data.token);
            commit("setUserInfo", res.data.data);
            router.replace("/");
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //菜单缩小
    changeIsCollapse({
      commit
    }, str) {
      console.log(str);
      commit("SetIsCollapse", str);
    },

    // changeTags({
    //   commit
    // }, val) {
    //   commit("setThemeConfigchangeTags", val);
    // },
  },
};