/**
 * Day 49 · ESLint 入门 · 校验逻辑（闭卷自测时别看）
 */

export function runChecks(userAnswers) {
  const expected = {
    q1: 'static',
    q2: 'format',
    q3: 'unused',
    q4: 'strict-eq',
    q5: 'some',
    q6: 'dev',
    q7: 'fail',
    q8: 'gate',
    q9: 'next-line',
    q10: 'vue-plugin',
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
