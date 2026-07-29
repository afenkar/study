/**
 * Day 46 · 第 13 周复盘 · 页面逻辑（无标准答案）
 */

import { runChecks } from './check.js';

const questionOptions = {
  q1: [
    { value: 'cssom', label: 'CSSOM 树' },
    { value: 'dom', label: 'DOM 树' },
  ],
  q2: [
    { value: 'http', label: 'HTTP 响应体' },
    { value: 'render', label: '渲染树' },
  ],
  q3: [
    { value: 'repaint-only', label: '仅重绘、一定不重排' },
    { value: 'reflow', label: '重排 Reflow' },
  ],
  q4: [
    { value: 'reflow', label: '重排' },
    { value: 'repaint', label: '重绘 Repaint' },
  ],
  q5: [
    { value: 'same', label: '完全一样' },
    { value: 'reflow-more', label: '重排通常更大' },
  ],
  q6: [
    { value: 'lcp', label: '最大内容完成' },
    { value: 'fcp', label: '首次有内容绘制' },
  ],
  q7: [
    { value: 'fcp', label: 'FCP' },
    { value: 'lcp', label: 'LCP' },
  ],
  q8: [
    { value: 'lcp', label: 'LCP' },
    { value: 'cors', label: 'CORS' },
  ],
  q9: [
    { value: 'composite', label: '可能只合成，少重排' },
    { value: 'reflow-fast', label: '强制重排更快' },
  ],
  q10: [
    { value: 'vitals', label: 'FCP、LCP 等' },
    { value: 'git', label: 'Git 冲突' },
  ],
};

function shuffle(array) {
  const items = [...array];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function buildSelect(selectId, options) {
  const select = document.getElementById(selectId);
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '请选择';

  select.replaceChildren(placeholder);

  shuffle(options).forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });
}

Object.entries(questionOptions).forEach(([selectId, options]) => {
  buildSelect(selectId, options);
});

document.body.classList.add('quiz-ready');

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const userAnswers = {};

  for (let i = 1; i <= 10; i++) {
    userAnswers[`q${i}`] = document.getElementById(`q${i}`).value;
  }

  const errors = runChecks(userAnswers);
  const score = 10 - errors.length;

  out.textContent = errors.length === 0
    ? '✅ 全部正确！10/10 — 第 13 周过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 44 / 45 笔记`;
});
