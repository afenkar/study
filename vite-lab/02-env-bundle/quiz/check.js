export const answers = {
  q1: 'no',
  q2: 'dev-local',
  q3: 'no',
  q4: 'restart',
  q5: 'cache',
  q6: 'split',
  q7: 'transfer',
  q8: 'build',
};

export function runChecks(userAnswers) {
  const errors = [];
  for (let i = 1; i <= 8; i++) {
    const key = `q${i}`;
    if (userAnswers[key] !== answers[key]) {
      errors.push(`第 ${i} 题错误`);
    }
  }
  return errors;
}
