/**
 * components.js + 概念题验证
 */
import { createApp, nextTick } from 'vue';
import { CounterDisplay, CounterPanel, ScoreBoard } from './components.js';

export const conceptAnswers = {
  q1: 'down', // props 数据方向？'down' / 'up'
  q2: 'no', // 子组件能直接改 props 吗？'yes' / 'no'
  q3: 'emit', // 子通知父用？'emit' / 'props'
};

export async function runComponentTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    check('用例1 CounterDisplay 声明了 count', CounterDisplay.props?.count != null);

    const mountA = document.createElement('div');
    document.body.appendChild(mountA);
    createApp(CounterDisplay, { count: 5 }).mount(mountA);
    check('用例1 渲染 count=5', mountA.textContent.includes('5'));
    mountA.remove();

    check('用例2 CounterPanel 声明了 step', CounterPanel.props?.step != null);
    check('用例2 CounterPanel 声明 emits add', CounterPanel.emits?.includes('add'));

    const mountB = document.createElement('div');
    document.body.appendChild(mountB);
    createApp(ScoreBoard).mount(mountB);
    check('用例2 初始分数 0', mountB.querySelector('.display')?.textContent.includes('0'));

    mountB.querySelector('.add-btn')?.click();
    await nextTick();
    check('用例2 点击 +2 后分数为 2', mountB.querySelector('.display')?.textContent.includes('2'));

    mountB.querySelector('.add-btn')?.click();
    await nextTick();
    check('用例2 再点一次分数为 4', mountB.querySelector('.display')?.textContent.includes('4'));
    mountB.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = { q1: 'down', q2: 'no', q3: 'emit' };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
