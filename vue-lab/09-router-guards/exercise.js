/**
 * router.js + 概念题验证
 */
import { createApp, nextTick } from 'vue';
import { createRoutes, createAppRouter } from './router.js';
import { AppShell } from './pages.js';

export const conceptAnswers = {
  q1: 'param', // `/user/:id` 中 `:id`？'param' / 'query'
  q2: 'useRoute', // 读 params？'useRoute' / 'useRouter'
  q3: 'beforeEach', // 跳转前拦截？'beforeEach' / 'afterEach'
};

export async function runGuardTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const routes = createRoutes();
    const userRoute = routes.find((r) => r.path?.includes(':id'));
    check('用例1 有动态路由', userRoute != null);

    const mount = document.createElement('div');
    document.body.appendChild(mount);
    const router = createAppRouter(() => false);
    createApp(AppShell, { loggedIn: false }).use(router).mount(mount);

    await router.isReady();
    await router.push('/user/42');
    await nextTick();
    check('用例2 显示用户42', mount.textContent.includes('42'));

    await router.push('/admin');
    await nextTick();
    check('用例3 未登录拦截到首页', mount.querySelector('.home') != null);
    check('用例3 未登录看不到后台', mount.querySelector('.admin') == null);

    mount.remove();

    const mount2 = document.createElement('div');
    document.body.appendChild(mount2);
    const router2 = createAppRouter(() => true);
    createApp(AppShell, { loggedIn: true }).use(router2).mount(mount2);

    await router2.isReady();
    await router2.push('/admin');
    await nextTick();
    check('用例4 已登录可进后台', mount2.querySelector('.admin') != null);
    mount2.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = { q1: 'param', q2: 'useRoute', q3: 'beforeEach' };
  Object.entries(expected).forEach(([k, v]) => {
    if (!answers[k]) errors.push(`概念题 ${k} 未填写`);
    else if (answers[k] !== v) errors.push(`概念题 ${k} 错误`);
  });
  return errors;
}
