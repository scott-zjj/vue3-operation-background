import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";
import Layout from "../layout/index.vue";

const routes = [{
    path: "/login",
    name: 'login',
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    name: "container",
    redirect: "home",
    meta: {
      requiresAuth: true, //有一些页面是否登录才能进去
      name: "首页",
    },
    children: [{
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true, //有一些页面是否登录才能进去
        name: "首页",
      },
    }, ],
  },
  
  {
    path: "/system",
    name: "system",
    component: Layout,
    meta: {
      name: "系统管理",
    },
    children: [{
        path: "/userMgt",
        name: "userMgt",
        component: () => import("../views/system/userMgt/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "用户管理",
        },
      },{
        path: "/roleMgt",
        name: "roleMgt",
        component: () => import("../views/system/roleMgt/index.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "角色管理",
        },
      }
    ],
  },
  {
    path: "/ErrorPage",
    name: "ErrorPage",
    component: Layout,
    meta: {
      name: "异常页面",
    },
    children: [{
        path: "/404",
        name: "404",
        component: () => import("../views/ErrorPage/404.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("../views/ErrorPage/500.vue"),
        meta: {
          requiresAuth: true, //有一些页面是否登录才能进去
          name: "500",
        },
      },
    ],
  },
  {
    path: "/users",
    name: "users",
    component: Layout,
    meta: {
      name: "个人中心",
    },
    children: [{
      path: "/about",
      name: "about",
      component: () => import("../views/users/about/index.vue"),
      meta: {
        requiresAuth: true,
        name: "关于我",
      },
    }]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;