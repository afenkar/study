/**
 * Day 27 练习：Vue Router 入门
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomePage, AboutPage } from './pages.js';

// TODO 1: createRoutes
export function createRoutes() {
  return [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
  ];
}

// TODO 2: createAppRouter
export function createAppRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: createRoutes(),
  });
}
