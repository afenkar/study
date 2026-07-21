/**
 * router.js + 概念题验证
 */
import { createApp, nextTick } from 'vue';
import { createRoutes, createAppRouter } from './router.js';
import { AppShell } from './pages.js';

export const conceptAnswers = {
  q1: 'router-view', // 当前路由组件渲染在哪？'router-view' / 'router-link'
  q2: 'router-link', // 菜单不刷新跳转？'router-link' / 'a-href'
  q3: 'router-push', // 代码里主动跳转？'router-push' / 'route-push'
};

export async function runRouterTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const routes = createRoutes();
    check('用例1 routes 是数组', Array.isArray(routes));
    check('用例1 两条路由', routes.length === 2);
    check('用例1 首页 path', routes[0]?.path === '/');
    check('用例1 关于 path', routes[1]?.path === '/about');

    const router = createAppRouter();
    const mount = document.createElement('div');
    document.body.appendChild(mount);
    createApp(AppShell).use(router).mount(mount);

    await router.isReady();
    check('用例2 初始在首页', mount.querySelector('.home') != null);

    await router.push('/about');
    await nextTick();
    check('用例3 跳转到关于页', mount.querySelector('.about') != null);

    mount.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'router-view',
    q2: 'router-link',
    q3: 'router-push',
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (!answers[k]) errors.push(`概念题 ${k} 未填写`);
    else if (answers[k] !== v) errors.push(`概念题 ${k} 错误`);
  });
  return errors;
}
