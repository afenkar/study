/**
 * Day 40 · HTTP 入门 · 10 题自测
 */

const answers = {
  q1: 'req-res',
  q2: 'get',
  q3: 'post',
  q4: 'no',
  q5: 'ok',
  q6: '404',
  q7: '401',
  q8: '403',
  q9: '400',
  q10: '500',
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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 40 笔记`;
});
