import { runScenarioChecks } from './check.js';

document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const answers = {};
  for (let i = 1; i <= 10; i++) {
    answers[`q${i}`] = document.getElementById(`q${i}`).value;
  }

  const errors = runScenarioChecks(answers);
  const score = 10 - errors.length;

  out.textContent = errors.length === 0
    ? '✅ 场景题全部通过！10/10'
    : `得分 ${score}/10。❌ ${errors.join('；')}`;
});
