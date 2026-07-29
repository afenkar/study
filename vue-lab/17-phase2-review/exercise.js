/**
 * 第 2 阶段总复盘 · 12 题（Day 20–35）
 */

const answers = {
  q1: 'value',
  q2: 'computed',
  q3: 'watch',
  q4: 'down',
  q5: 'prop-emit',
  q6: 'beforeEach',
  q7: 'params',
  q8: 'actions',
  q9: 'pinia',
  q10: 'use',
  q11: 'logic',
  q12: 'keep-alive',
};

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 12; i++) {
    if (document.getElementById(`q${i}`).value !== answers[`q${i}`]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  const score = 12 - errors.length;
  out.textContent = errors.length === 0
    ? '✅ 全部正确！12/12 — 第 2 阶段 Vue 深度过关 🎉'
    : `得分 ${score}/12。❌ ${errors.join('；')} — 见 notes/week11-day36-phase2-review.md 错题索引`;
});
