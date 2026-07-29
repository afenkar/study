/**
 * stores.js + 概念题验证
 */
import { createApp, nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { useCounterStore, useUserStore } from './stores.js';

export const conceptAnswers = {
  q1: 'defineStore', // defineStore / defineComponent
  q2: 'useXxxStore', // useXxxStore / ref
  q3: 'pinia', // pinia / props
};

export async function runPiniaTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const pinia = createPinia();
    setActivePinia(pinia);

    const counter = useCounterStore();
    check('用例1 初始 count 为 0', counter.count === 0);
    counter.increment();
    check('用例1 increment', counter.count === 1);

    const user = useUserStore();
    check('用例2 初始 name 为空', user.name === '');
    user.setName('王五');
    check('用例2 setName', user.name === '王五');

    const mount = document.createElement('div');
    document.body.appendChild(mount);
    const piniaForDom = createPinia();
    const { AppDemo } = await import('./app.js');
    createApp(AppDemo).use(piniaForDom).mount(mount);
    await nextTick();

    mount.querySelector('.inc-btn')?.click();
    await nextTick();
    check('用例3 页面计数更新', mount.querySelector('.count')?.textContent.includes('1'));

    const input = mount.querySelector('.name-input');
    input.value = '赵六';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    check('用例3 页面问候语', mount.querySelector('.greet')?.textContent.includes('赵六'));

    mount.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: ['defineStore'],
    q2: ['useXxxStore', 'useCounterStore', 'useUserStore'],
    q3: ['pinia'],
  };
  Object.entries(expected).forEach(([k, allowed]) => {
    const val = answers[k]?.trim();
    if (!val) errors.push(`概念题 ${k} 未填写`);
    else if (!allowed.includes(val)) errors.push(`概念题 ${k} 错误`);
  });
  return errors;
}
