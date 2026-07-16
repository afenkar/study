import { runChecks } from './exercise.js';

// 实验：async1 / async2 经典题
document.getElementById('btn-demo').addEventListener('click', () => {
  const lines = [];
  const log = (msg) => {
    lines.push(msg);
    console.log(msg);
  };

  async function async1() {
    log('1');
    await async2();
    log('2');
  }
  async function async2() {
    log('3');
  }

  console.group('Day 17 · async1/async2 经典题');
  log('4');
  async1();
  log('5');
  console.groupEnd();

  setTimeout(() => {
    document.getElementById('out-demo').textContent =
      `控制台顺序：${lines.join(' → ')}\n预期：4 → 1 → 3 → 5 → 2`;
  }, 0);
});

// 验证
document.getElementById('btn-check').addEventListener('click', () => {
  const userAnswers = {};
  for (let i = 1; i <= 8; i++) {
    userAnswers[`q${i}`] = document.getElementById(`q${i}`).value;
  }

  const errors = runChecks(userAnswers);
  const out = document.getElementById('out-check');
  const score = 8 - errors.length;

  out.textContent = errors.length === 0
    ? '✅ 全部正确！8/8 — 事件循环过关'
    : `得分 ${score}/8。❌ ${errors.join('；')}`;
});
