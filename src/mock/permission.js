//模拟菜单和登录数据
// 引入mockjs
import Mock from "mockjs";

const Random = Mock.Random;

let menuList = [{
    title: "首页",
    url: "/home",
    icon: "HomeFilled",
  },
  {
    url: "/system",
    title: "系统管理",
    icon: "Tools",
    children: [{
        url: "/userMgt",
        title: "用户管理",
        icon: "Menu",
      },{
        url: "/roleMgt",
        title: "角色管理",
        icon: "Menu",
      }
    ],
  },
  {
    url: "/ErrorPage",
    title: "异常页面",
    icon: "WarningFilled",
    children: [{
        url: "/404",
        title: "404",
        icon: "Menu",
      },
      {
        url: "/500",
        title: "500",
        icon: "Menu",
      },
    ],
  },
  
  {
    url: "/about",
    title: "个人中心",
    icon: "Avatar",
    children: [{
      url: "/about",
      title: "关于我的",
      icon: "Menu",
    }, ],
  },
];

//模拟登录
export const LoginInfo = (options) => {
  console.log(options, "接收post参数");
  const {
    username,
    password
  } = JSON.parse(options.body);
  if (username == "admin" && password != "123456") {
    return {
      code: "-200",
      data: {
        message: "用户不存在",
      },
    };
  } else {
    return {
      code: "200",
      data: {
        user_id: Random.id(),
        name: Random.cname(),
        token: Random.guid(),
        image: "https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660064400&t=6fe6057370cbe369654ff2e132d02a37",
      },
    };
  }
};
//模拟菜单数据处理
export const getMenuList = (options) => {
  const obj = JSON.parse(options.body);
  return {
    code: 200,
    data: {
      menuList: menuList,
    },
  };
};

