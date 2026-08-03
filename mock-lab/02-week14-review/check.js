/**
 * Day 51 · 第 14 周复盘 · 校验逻辑（闭卷自测时别看）
 */

export function runChecks(userAnswers) {
  const expected = {
    q1: 'staging',
    q2: 'push',
    q3: 'current',
    q4: 'add-commit',
    q5: 'quality',
    q6: 'format',
    q7: 'no',
    q8: 'dev',
    q9: 'align',
    q10: 'no',
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
