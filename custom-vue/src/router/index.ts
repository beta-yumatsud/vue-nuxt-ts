import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Modal from "../views/Modal.vue";
import Carousel from "@/views/Carousel.vue";
import Accordion from "../views/Accordion.vue";
import Product from "@/views/Product.vue";
import Quiz from "@/views/Quiz.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/carousel",
    name: "Carousel",
    component: Carousel,
  },
  {
    path: "/accordion",
    name: "Accordion",
    component: Accordion,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
