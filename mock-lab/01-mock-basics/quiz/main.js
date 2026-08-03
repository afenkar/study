/**
 * Day 50 · Mock 入门 · 页面逻辑（无标准答案）
 */

import { runChecks } from './check.js';

const questionOptions = {
  q1: [
    { value: 'block', label: '后端未就绪时前端仍能开发调试' },
    { value: 'deploy', label: '替代 npm run build 部署' },
  ],
  q2: [
    { value: 'fake', label: '本地 JSON / 工具生成的假数据' },
    { value: 'db', label: '一定来自生产数据库' },
  ],
  q3: [
    { value: 'align', label: '联调时少改组件和类型定义' },
    { value: 'random', label: '字段名随便起，联调再改' },
  ],
  q4: [
    { value: 'fetch-json', label: 'fetch 本地 JSON 文件' },
    { value: 'sql', label: '直接写 SQL 查库' },
  ],
  q5: [
    { value: 'rest', label: '把 JSON 快速当 REST API 用' },
    { value: 'lint', label: '检查 JS 语法错误' },
  ],
  q6: [
    { value: 'intercept', label: '拦截网络请求返回 Mock 响应' },
    { value: 'css', label: '压缩 CSS 文件' },
  ],
  q7: [
    { value: 'no', label: '不能，上线前必须真接口联调' },
    { value: 'yes', label: '可以，Mock 和真接口完全一样' },
  ],
  q8: [
    { value: 'switch-api', label: '切换 mock / 真实 API 地址' },
    { value: 'theme', label: '切换页面主题色' },
  ],
  q9: [
    { value: 'test-ui', label: '测试未登录跳转等前端逻辑' },
    { value: 'speed', label: '加快 ESLint 运行' },
  ],
  q10: [
    { value: 'parallel', label: '前后端互不阻塞、并行开发' },
    { value: 'git', label: '替代 Git 分支管理' },
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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 50 笔记`;
});
