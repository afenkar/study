/**
 * 第 11 周复盘 · 10 题（Day 37–38 Vite）
 */

const answers = {
  q1: 'dev-server',
  q2: 'dist',
  q3: 'preview',
  q4: 'vite',
  q5: 'meta',
  q6: 'dev-local',
  q7: 'no',
  q8: 'restart',
  q9: 'split',
  q10: 'source',
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
    ? '✅ 全部正确！10/10 — 第 11 周 Vite 过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 37 / 38 笔记`;
});
