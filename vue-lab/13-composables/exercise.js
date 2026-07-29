/**
 * composables.js + 概念题验证
 */
import { createApp, nextTick } from 'vue';
import { useCounter, useToggle } from './composables.js';

export const conceptAnswers = {
  q1: 'use', // use 开头 / create 开头
  q2: 'reuse-logic', // reuse-logic / new-component
  q3: 'yes', // yes / no
};

export async function runComposableTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const { count, increment } = useCounter();
    check('用例1 初始为 0', count.value === 0);
    increment();
    increment();
    check('用例1 increment', count.value === 2);

    const { isOpen, toggle } = useToggle(false);
    check('用例2 初始 false', isOpen.value === false);
    toggle();
    check('用例2 toggle 为 true', isOpen.value === true);
    toggle();
    check('用例2 再 toggle 为 false', isOpen.value === false);

    const mount = document.createElement('div');
    document.body.appendChild(mount);
    const { AppDemo } = await import('./app.js');
    createApp(AppDemo).mount(mount);
    await nextTick();

    mount.querySelector('.inc-btn')?.click();
    mount.querySelector('.inc-btn')?.click();
    await nextTick();
    check('用例3 页面计数为 2', mount.querySelector('.count')?.textContent.includes('2'));

    mount.querySelector('.toggle-btn')?.click();
    await nextTick();
    check('用例3 面板为开', mount.querySelector('.toggle-status')?.textContent.includes('开'));

    mount.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = { q1: 'use', q2: 'reuse-logic', q3: 'yes' };
  Object.entries(expected).forEach(([k, v]) => {
    if (!answers[k]) errors.push(`概念题 ${k} 未填写`);
    else if (answers[k] !== v) errors.push(`概念题 ${k} 错误`);
  });
  return errors;
}
