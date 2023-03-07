import { createRouter, createWebHistory } from "vue-router";
import { user } from "../stores/user"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Home.vue"),
      beforeEnter(to, from, next){
        if(!user().email.length) return next('/login')
        next()
      }
    },
    {
      path: "/login",
      name: "Login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Login.vue"),
    },
  ],
});

export default router;
