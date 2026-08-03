/**
 * Day 47 · Git 入门 · 页面逻辑（无标准答案）
 */

import { runChecks } from './check.js';

const questionOptions = {
  q1: [
    { value: 'vcs', label: '版本控制，记录代码变更历史' },
    { value: 'deploy', label: '自动部署到服务器' },
  ],
  q2: [
    { value: 'staging', label: '暂存区（staging）' },
    { value: 'remote', label: '远程仓库' },
  ],
  q3: [
    { value: 'local', label: '本地仓库' },
    { value: 'staging', label: '暂存区' },
  ],
  q4: [
    { value: 'status', label: '查看工作区 / 暂存区状态' },
    { value: 'delete', label: '删除所有未提交改动' },
  ],
  q5: [
    { value: 'parallel', label: '并行开发、功能隔离' },
    { value: 'speed', label: '让 Git 运行更快' },
  ],
  q6: [
    { value: 'push-remote', label: '把本地 commit 推到远程' },
    { value: 'pull-remote', label: '从远程拉代码到本地' },
  ],
  q7: [
    { value: 'pull-remote', label: '拉远程更新并合并到本地' },
    { value: 'push-remote', label: '只上传不下载' },
  ],
  q8: [
    { value: 'ignore', label: '指定哪些文件不纳入版本控制' },
    { value: 'backup', label: '自动备份被删文件' },
  ],
  q9: [
    { value: 'tool-host', label: 'Git 是工具；GitHub 是托管平台' },
    { value: 'same', label: '完全同一个东西' },
  ],
  q10: [
    { value: 'feat', label: 'feat:' },
    { value: 'fix', label: 'fix:' },
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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 47 笔记`;
});
