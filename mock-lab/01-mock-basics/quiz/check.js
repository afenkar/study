/**
 * Day 50 · Mock 入门 · 校验逻辑（闭卷自测时别看）
 */

export function runChecks(userAnswers) {
  const expected = {
    q1: 'block',
    q2: 'fake',
    q3: 'align',
    q4: 'fetch-json',
    q5: 'rest',
    q6: 'intercept',
    q7: 'no',
    q8: 'switch-api',
    q9: 'test-ui',
    q10: 'parallel',
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
