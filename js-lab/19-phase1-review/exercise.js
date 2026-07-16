/**
 * 第 1 阶段总复盘 · 12 题
 */

const answers = {
  q1: 'a',
  q2: 'b',
  q3: 'b',
  q4: 'b',
  q5: 'b',
  q6: 'b',
  q7: 'a',
  q8: 'a',
  q9: 'b',
  q10: 'a',
  q11: ['1,4,3,2', '1 4 3 2'],
  q12: ['4,1,3,5,2', '4 1 3 5 2'],
};

function normalize(str) {
  return str.trim().replace(/\s+/g, '').replace(/,/g, '').toLowerCase();
}

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 10; i++) {
    if (document.getElementById(`q${i}`).value !== answers[`q${i}`]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  ['q11', 'q12'].forEach((key) => {
    const val = document.getElementById(key).value;
    const ok = answers[key].some((exp) => normalize(val) === normalize(exp));
    if (!ok) errors.push(`第 ${key.replace('q', '')} 题错误`);
  });

  const score = 12 - errors.length;
  out.textContent = errors.length === 0
    ? '✅ 全部正确！12/12 — 第 1 阶段 JS 地基过关 🎉'
    : `得分 ${score}/12。❌ ${errors.join('；')}`;
});
