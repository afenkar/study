/**
 * 第 4 周复盘 · 10 题自测（Day 8 + 15–17）
 */

const answers = {
  q1: 'micro',
  q2: 'yes',
  q3: 'first',
  q4: 'parallel',
  q5: 'no',
  q6: 'second',
  q7: 'promise',
  q8: ['1,4,3,2', '1 4 3 2'],
  q9: ['4,1,3,5,2', '4 1 3 5 2'],
  q10: 'micro',
};

function normalize(str) {
  return str.trim().replace(/\s+/g, '').replace(/,/g, '').toLowerCase();
}

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 7; i++) {
    const key = `q${i}`;
    if (document.getElementById(key).value !== answers[key]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  if (document.getElementById('q10').value !== answers.q10) {
    errors.push('第 10 题错误');
  }

  ['q8', 'q9'].forEach((key) => {
    const val = document.getElementById(key).value;
    const ok = answers[key].some((exp) => normalize(val) === normalize(exp));
    if (!ok) errors.push(`第 ${key.replace('q', '')} 题错误`);
  });

  const score = 10 - errors.length;
  out.textContent = errors.length === 0
    ? '✅ 全部正确！10/10 — 第 4 周异步过关'
    : `得分 ${score}/10。❌ ${errors.join('；')}`;
});
