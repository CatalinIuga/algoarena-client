import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "./store";

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
      path: "/signup",
      component: () => import("./views/Signup.vue"),
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
      path: "/users",
      component: () => import("./views/Users.vue"),
    },
    {
      // unmatched paths will redirect to 404
      path: "/:pathMatch(.*)*",
      component: () => import("./views/404.vue"),
    },
  ],
});

// TODO: this for auth
router.beforeEach(async (to, _from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/signup", "/"];
  const store = authStore();
  const userid = storeToRefs(store).userId;

  const authRequired = !publicPages.includes(to.path);
  await store.checkAuth();

  if (authRequired && !userid.value) {
    return next("/login");
  } else if (userid.value && (to.path === "/login" || to.path === "/signup")) {
    return next("/");
  }

  next();
});
