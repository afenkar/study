/**
 * Day 49 · ESLint 入门 · 页面逻辑（无标准答案）
 */

import { runChecks } from './check.js';

const questionOptions = {
  q1: [
    { value: 'static', label: '静态检查代码问题与规范' },
    { value: 'bundle', label: '打包压缩 JS' },
  ],
  q2: [
    { value: 'format', label: '统一代码格式（缩进、换行等）' },
    { value: 'logic', label: '检查未使用变量' },
  ],
  q3: [
    { value: 'unused', label: '变量声明了但未使用' },
    { value: 'undef', label: '使用了未声明的变量' },
  ],
  q4: [
    { value: 'strict-eq', label: '使用 === 和 !==' },
    { value: 'loose-eq', label: '必须用 == 和 !=' },
  ],
  q5: [
    { value: 'some', label: '自动修复部分可 fix 的问题' },
    { value: 'all', label: '自动修复所有报错包括逻辑错误' },
  ],
  q6: [
    { value: 'dev', label: 'devDependencies' },
    { value: 'prod', label: 'dependencies' },
  ],
  q7: [
    { value: 'fail', label: '视为错误，常导致 CI 失败' },
    { value: 'ignore', label: '完全忽略' },
  ],
  q8: [
    { value: 'gate', label: '合并前拦截不符合规范的代码' },
    { value: 'deploy', label: '替代 npm run build' },
  ],
  q9: [
    { value: 'next-line', label: '下一行禁用指定规则' },
    { value: 'delete-all', label: '删除整个配置文件' },
  ],
  q10: [
    { value: 'vue-plugin', label: 'eslint-plugin-vue 等 Vue 规则' },
    { value: 'no-plugin', label: 'Vue 项目不需要任何 ESLint 插件' },
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
    ? '✅ 全部正确！10/10'
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 49 笔记`;
});
