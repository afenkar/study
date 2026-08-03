/**
 * Day 48 · Git 分支与冲突 · 校验逻辑（闭卷自测时别看）
 */

export function runChecks(userAnswers) {
  const expected = {
    q1: 'same-region',
    q2: 'current',
    q3: 'edit',
    q4: 'add-commit',
    q5: 'cancel',
    q6: 'both-changed',
    q7: 'local-resolve',
    q8: 'no',
    q9: 'may-conflict',
    q10: 'small-pull',
  };

  const errors = [];

  for (let i = 1; i <= 10; i++) {
    const key = `q${i}`;
    if (!userAnswers[key]) {
      errors.push(`第 ${i} 题未填写`);
    } else if (userAnswers[key] !== expected[key]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  return errors;
}
