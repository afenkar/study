/**
 * 第 8 周复盘 · 10 题自测（Day 30）
 */

const answers = {
  q1: 'defineStore',
  q2: 'pinia',
  q3: 'useStore',
  q4: 'state',
  q5: 'actions',
  q6: 'use',
  q7: 'store',
  q8: 'computed',
  q9: 'ref',
  q10: 'share',
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
    ? '✅ 全部正确！10/10 — 第 8 周 Pinia 过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 30 笔记`;
});
