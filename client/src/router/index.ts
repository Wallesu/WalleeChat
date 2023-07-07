import { createRouter, createWebHistory } from "vue-router";
import { user } from "../stores/user"
import axios from '../utils/httpRequest'

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
      async beforeEnter(to, from, next){
        if(!user().email.length){
          if(!localStorage.getItem('accessToken')) return next('/login')

          try {
            const userDB = await axios.get('http://localhost:3000/users/me').then((res: { data: any; }) => res.data)
            user().setId(userDB.id)
                user().setEmail(userDB.email)
                user().setNickname(userDB.nickname)
                if(userDB.bio) user().setBio(userDB.bio)
                if(userDB.photo_id){
                    user().setPhoto(userDB.photo_id)
                }
            
          } catch (error: any) {
            console.error(error.message)
            return next('/login')
          }
        }
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
