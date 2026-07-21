/**
 * 第 6 周复盘 · 10 题自测（Day 23–25）
 */

const answers = {
  q1: 'down',
  q2: 'emit',
  q3: 'no',
  q4: 'parent',
  q5: 'child',
  q6: 'slot',
  q7: 'modelValue',
  q8: 'update',
  q9: 'sugar',
  q10: 'a',
};

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 10; i++) {
    if (document.getElementById(`q${i}`).value !== answers[`q${i}`]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  const score = 10 - errors.length;
  out.textContent = errors.length === 0
    ? '✅ 全部正确！10/10 — 第 6 周组件通信过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 23–25 笔记`;
});
