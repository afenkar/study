/**
 * 参考答案 — 做完后再对照
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomePage, UserPage, AdminPage } from './pages.js';

export function createRoutesReference() {
  return [
    { path: '/', component: HomePage },
    { path: '/user/:id', component: UserPage },
    { path: '/admin', component: AdminPage },
  ];
}

export function setupGuardsReference(router, isLoggedIn) {
  router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/admin') && !isLoggedIn()) {
      next('/');
    } else {
      next();
    }
  });
}

export function createAppRouterReference(isLoggedIn = () => false) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: createRoutesReference(),
  });
  setupGuardsReference(router, isLoggedIn);
  return router;
}
