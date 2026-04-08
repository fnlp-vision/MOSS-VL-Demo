import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/demo/:id",
      name: "demo",
      component: () => import("@/views/DemoView.vue"),
      props: true,
    },
  ],
});

export default router;
