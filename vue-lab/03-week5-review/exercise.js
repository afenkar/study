/**
 * 第 5 周复盘 · 10 题自测（Day 20–21）
 */

const answers = {
  q1: 'ref',
  q2: 'reactive',
  q3: 'value',
  q4: 'no',
  q5: 'no',
  q6: 'computed',
  q7: 'cache',
  q8: 'watch',
  q9: 'no',
  q10: 'no',
};

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 10; i++) {
    const key = `q${i}`;
    if (document.getElementById(key).value !== answers[key]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  const score = 10 - errors.length;
  out.textContent = errors.length === 0
    ? '✅ 全部正确！10/10 — 第 5 周响应式过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 20/21 笔记`;
});
