/**
 * 第 1 周复盘 · 10 题自测
 * 先选答案，再点验证
 */

const answers = {
  q1: 'a',
  q2: 'b',
  q3: 'b',
  q4: 'b',
  q5: 'b',
  q6: 'a',
  q7: 'c',
  q8: 'b',
  q9: ['1,4,3,2', '1 4 3 2', '1432'],
  q10: 'b',
};

function normalizeOrder(str) {
  return str.replace(/\s+/g, '').replace(/,/g, '');
}

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 8; i++) {
    const key = `q${i}`;
    const el = document.getElementById(key);
    if (el.value !== answers[key]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  const q9 = document.getElementById('q9').value.trim();
  const q9ok = answers.q9.some((a) => normalizeOrder(q9) === normalizeOrder(a));
  if (!q9ok) errors.push('第 9 题错误（应为 1,4,3,2）');

  if (document.getElementById('q10').value !== answers.q10) {
    errors.push('第 10 题错误');
  }

  const score = 10 - errors.length;
  out.textContent = errors.length === 0
    ? `✅ 全部正确！10/10 — 第 1 周地基过关`
    : `得分 ${score}/10。❌ ${errors.join('；')}`;
});
