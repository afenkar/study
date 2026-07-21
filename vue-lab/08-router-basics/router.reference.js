/**
 * 参考答案 — 做完后再对照
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomePage, AboutPage } from './pages.js';

export function createRoutesReference() {
  return [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
  ];
}

export function createAppRouterReference() {
  return createRouter({
    history: createWebHashHistory(),
    routes: createRoutesReference(),
  });
}
