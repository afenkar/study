/**
 * Day 46 · 校验逻辑（闭卷自测时别看）
 */

export function runChecks(userAnswers) {
  const expected = {
    q1: 'dom',
    q2: 'render',
    q3: 'reflow',
    q4: 'repaint',
    q5: 'reflow-more',
    q6: 'fcp',
    q7: 'lcp',
    q8: 'lcp',
    q9: 'composite',
    q10: 'vitals',
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
