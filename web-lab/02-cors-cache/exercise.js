/**
 * Day 41 · CORS + 缓存 · 10 题自测
 */

const answers = {
  q1: 'cross',
  q2: 'browser',
  q3: 'server',
  q4: 'acao',
  q5: 'proxy',
  q6: 'options',
  q7: 'cache-control',
  q8: 'local',
  q9: '304',
  q10: 'long-cache',
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
    ? '✅ 全部正确！10/10'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 41 笔记`;
});
