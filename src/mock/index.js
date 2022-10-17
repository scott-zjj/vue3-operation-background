import Mock from "mockjs";

import {
  LoginInfo,
  getMenuList,
} from "./permission.js";

Mock.mock("/permission/LoginInfo", "post", LoginInfo);
Mock.mock("/permission/getMenuList", "get", getMenuList);