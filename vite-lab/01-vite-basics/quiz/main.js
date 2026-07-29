import { runChecks } from './check.js';

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const userAnswers = {};
  for (let i = 1; i <= 8; i++) {
    userAnswers[`q${i}`] = document.getElementById(`q${i}`).value;
  }

  const errors = runChecks(userAnswers);
  const score = 8 - errors.length;

  out.textContent = errors.length === 0
    ? '✅ 全部正确！8/8'
    : `得分 ${score}/8。❌ ${errors.join('；')}`;
});
