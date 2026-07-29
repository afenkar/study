/**
 * 第 7 周复盘 · 10 题自测（Day 27–28）
 */

const answers = {
  q1: 'view',
  q2: 'link',
  q3: 'router-push',
  q4: 'lower',
  q5: 'hash',
  q6: 'param',
  q7: 'route',
  q8: 'query',
  q9: 'before',
  q10: 'redirect',
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
    ? '✅ 全部正确！10/10 — 第 7 周 Router 过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 27–28 笔记`;
});
