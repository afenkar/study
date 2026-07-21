/**
 * Day 28 练习：动态路由与路由守卫
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { HomePage, UserPage, AdminPage } from './pages.js';

export function createRoutes() {
  return [
    { path: '/', component: HomePage },
    { path: '/admin', component: AdminPage },
    { path:'/user/:id',component:UserPage }
  ];
}

export function setupGuards(router, isLoggedIn) {
  // TODO 2: beforeEach — 访问 /admin 未登录则 next('/')
  // throw new Error('TODO 2');
  router.beforeEach((to,from,next)=>{
    if(to.path.startsWith('/admin') && !isLoggedIn()){
      next('/');
    }else{
      next();
    }
  })
}

export function createAppRouter(isLoggedIn = () => false) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: createRoutes(),
  });
  setupGuards(router, isLoggedIn);
  return router;
}
