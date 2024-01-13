import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
    },
    {
      // unmatched path
      path: "/:pathMatch(.*)*",
      component: () => import("./views/404.vue"),
    },
  ],
});
