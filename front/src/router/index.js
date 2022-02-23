import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin_login",
    name: "AdminLogin",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/professor/:id",
    name: "professor",
    component: () => import("../views/ProfInfo.vue"),
    props: true,
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("../views/User.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
