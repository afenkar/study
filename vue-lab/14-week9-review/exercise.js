/**
 * 第 9 周复盘 · 10 题自测（Day 32 + 对比）
 */

const answers = {
  q1: 'use',
  q2: 'reuse',
  q3: 'yes',
  q4: 'pinia',
  q5: 'composable',
  q6: 'ref',
  q7: 'value',
  q8: 'ref-method',
  q9: 'pinia',
  q10: 'logic',
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
    ? '✅ 全部正确！10/10 — 第 9 周 composable 过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 32 笔记`;
});
