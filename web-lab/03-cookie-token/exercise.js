/**
 * Day 42 · Cookie / Token · 10 题自测
 */

const answers = {
  q1: 'set-cookie',
  q2: 'httponly',
  q3: 'server',
  q4: 'auth',
  q5: 'token',
  q6: 'save',
  q7: '401',
  q8: '403',
  q9: 'interceptor',
  q10: 'login',
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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 42 笔记`;
});
