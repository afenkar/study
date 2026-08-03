/**
 * Day 51 · 第 14 周复盘 · 页面逻辑（无标准答案）
 */

import { runChecks } from './check.js';

const questionOptions = {
  q1: [
    { value: 'staging', label: '暂存区' },
    { value: 'remote', label: '远程仓库' },
  ],
  q2: [
    { value: 'push', label: '把本地 commit 推到远程' },
    { value: 'pull', label: '从远程拉代码' },
  ],
  q3: [
    { value: 'current', label: '当前分支（HEAD）内容' },
    { value: 'remote-head', label: '远程 HEAD 指针' },
  ],
  q4: [
    { value: 'add-commit', label: 'git add 后 git commit' },
    { value: 'push-only', label: '直接 push，不用 add' },
  ],
  q5: [
    { value: 'quality', label: '代码质量 / 逻辑规范' },
    { value: 'format', label: '缩进换行排版' },
  ],
  q6: [
    { value: 'format', label: '代码格式排版' },
    { value: 'quality', label: '未使用变量检查' },
  ],
  q7: [
    { value: 'no', label: '不能，要手删或用起来' },
    { value: 'yes', label: '能，会自动删变量' },
  ],
  q8: [
    { value: 'dev', label: '后端未就绪时前端并行开发' },
    { value: 'deploy', label: '替代生产部署' },
  ],
  q9: [
    { value: 'align', label: '联调时少改组件和数据层' },
    { value: 'random', label: '字段随便起名即可' },
  ],
  q10: [
    { value: 'no', label: '不能，必须真接口验证' },
    { value: 'yes', label: '能，Mock 与真接口等价' },
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
    ? '✅ 全部正确！10/10 — 第 14 周过关'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 47–50 笔记`;
});
