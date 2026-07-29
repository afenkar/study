/**
 * Day 44 · 浏览器渲染 · 10 题自测
 * 选项在页面加载时随机打乱，避免正确答案总在第一个
 */

const answers = {
  q1: 'dom',
  q2: 'cssom',
  q3: 'render-tree',
  q4: 'layout',
  q5: 'repaint',
  q6: 'reflow',
  q7: 'reflow-more',
  q8: 'no',
  q9: 'composite',
  q10: 'repaint',
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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 44 笔记`;
});
