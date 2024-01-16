import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("./views/Register.vue"),
    },
    {
      path: "/profile",
      component: () => import("./views/Profile.vue"),
    },
    {
      path: "/problemsets",
      component: () => import("./views/ProblemSets.vue"),
    },
    {
      // specific set
      path: "/problemsets/:id",
      component: () => import("./views/ProblemSet.vue"),
    },
    {
      path: "/problemsets/:id/problem/:problemId",
      component: () => import("./views/Problem.vue"),
    },
    {
      // unmatched paths will redirect to 404
      path: "/:pathMatch(.*)*",
      component: () => import("./views/404.vue"),
    },
  ],
});

// TODO: this for auth
// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login", "/register", "/"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   if (authRequired && !loggedIn) {
//     return next("/login");
//   }

//   next();
// });
