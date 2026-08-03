/**
 * Day 48 · Git 分支与冲突 · 页面逻辑（无标准答案）
 */

import { runChecks } from './check.js';

const questionOptions = {
  q1: [
    { value: 'same-region', label: '两分支改了同一文件的同一区域' },
    { value: 'diff-file', label: '两分支改了完全不同的文件' },
  ],
  q2: [
    { value: 'current', label: '当前分支（HEAD）的内容' },
    { value: 'remote-only', label: '远程仓库专属内容' },
  ],
  q3: [
    { value: 'edit', label: '打开文件，删标记、保留正确代码' },
    { value: 'abort', label: '直接 git merge --abort' },
  ],
  q4: [
    { value: 'add-commit', label: 'git add 后 git commit 完成合并' },
    { value: 'push-only', label: '直接 git push，不用 add' },
  ],
  q5: [
    { value: 'cancel', label: '取消 merge，回到合并前' },
    { value: 'force', label: '强制覆盖对方分支' },
  ],
  q6: [
    { value: 'both-changed', label: '本地和远程都改了同一处' },
    { value: 'network', label: '一定是网络断了' },
  ],
  q7: [
    { value: 'local-resolve', label: '本地拉 main、解冲突、再 push' },
    { value: 'ignore', label: '忽略冲突直接点 Merge' },
  ],
  q8: [
    { value: 'no', label: '不能，要先解决并 commit' },
    { value: 'yes', label: '可以，Git 会自动合并' },
  ],
  q9: [
    { value: 'may-conflict', label: '都可能产生冲突，需要手动解决' },
    { value: 'never', label: '都不会有冲突' },
  ],
  q10: [
    { value: 'small-pull', label: '小步提交、先 pull 再 push、及时沟通' },
    { value: 'big-branch', label: '一个分支攒几周再合' },
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
    : `得分 ${score}/10。❌ ${errors.join('；')} — 回看 Day 48 笔记`;
});
