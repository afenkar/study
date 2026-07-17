/**
 * components.js + 概念题验证
 */
import { createApp } from 'vue';
import { BaseCard, PageShell, DemoApp } from './components.js';

export const conceptAnswers = {
  q1: 'parent', // 插槽内容由谁提供？'parent' / 'child'
  q2: 'slot', // 传整块 UI 用？'props' / 'slot'
  q3: 'child', // <slot> 写在？'parent' / 'child'
};

export async function runSlotTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const mountA = document.createElement('div');
    document.body.appendChild(mountA);
    const CardWrap = {
      components: { BaseCard },
      template: `<BaseCard title="测试"><p class="slot-a">插槽内容A</p></BaseCard>`,
    };
    createApp(CardWrap).mount(mountA);
    check('用例1 插槽内容渲染', mountA.querySelector('.slot-a') != null);
    check('用例1 标题仍来自 props', mountA.textContent.includes('测试'));
    mountA.remove();

    const mountB = document.createElement('div');
    document.body.appendChild(mountB);
    const ShellWrap = {
      components: { PageShell },
      template: `<PageShell><p class="slot-b">主区域文字</p></PageShell>`,
    };
    createApp(ShellWrap).mount(mountB);
    check('用例2 PageShell 插槽渲染', mountB.querySelector('.slot-b') != null);
    mountB.remove();

    const mountC = document.createElement('div');
    document.body.appendChild(mountC);
    createApp(DemoApp).mount(mountC);
    check('用例3 DemoApp profile 显示', mountC.querySelector('.profile') != null);
    check('用例3 DemoApp main 显示', mountC.querySelector('.main-text') != null);
    mountC.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = { q1: 'parent', q2: 'slot', q3: 'child' };
  Object.entries(expected).forEach(([k, v]) => {
    if (!answers[k]) errors.push(`概念题 ${k} 未填写`);
    else if (answers[k] !== v) errors.push(`概念题 ${k} 错误`);
  });
  return errors;
}
