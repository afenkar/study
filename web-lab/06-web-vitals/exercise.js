/**
 * Day 45 · FCP / LCP · 10 题自测
 * 选项在页面加载时随机打乱
 */

const answers = {
  q1: 'fcp',
  q2: 'largest',
  q3: 'lcp',
  q4: 'blank',
  q5: 'lcp',
  q6: 'no',
  q7: 'cwv',
  q8: 'lcp',
  q9: 'vitals',
  q10: 'fcp-feel',
};

function shuffleSelectOptions(selectId) {
  const select = document.getElementById(selectId);
  const placeholder = select.querySelector('option[value=""]');
  const options = [...select.querySelectorAll('option')].filter((o) => o.value !== '');

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  select.replaceChildren(placeholder, ...options);
}

for (let i = 1; i <= 10; i++) {
  shuffleSelectOptions(`q${i}`);
}

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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 45 笔记`;
});
