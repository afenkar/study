/**
 * 第 12 周复盘 · 10 题（Day 40–42 HTTP）
 */

const answers = {
  q1: 'get',
  q2: '401',
  q3: '403',
  q4: 'yes',
  q5: 'cors',
  q6: 'local',
  q7: '304',
  q8: 'auth',
  q9: 'server',
  q10: 'token',
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
    ? '✅ 全部正确！10/10 — 第 12 周 HTTP 过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 40–42 笔记`;
});
