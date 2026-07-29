/**
 * 第 10 周复盘 · 10 题自测（Day 34 性能 + DevTools）
 */

const answers = {
  q1: 'v-show',
  q2: 'v-if',
  q3: 'id',
  q4: 'chaos',
  q5: 'keep-alive',
  q6: 'import',
  q7: 'computed',
  q8: 'measure',
  q9: 'components',
  q10: 'pinia',
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
    ? '✅ 全部正确！10/10 — 第 10 周过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 34 / 35 笔记`;
});
