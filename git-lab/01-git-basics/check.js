/**
 * Day 47 · Git 入门 · 校验逻辑（闭卷自测时别看）
 */

export function runChecks(userAnswers) {
  const expected = {
    q1: 'vcs',
    q2: 'staging',
    q3: 'local',
    q4: 'status',
    q5: 'parallel',
    q6: 'push-remote',
    q7: 'pull-remote',
    q8: 'ignore',
    q9: 'tool-host',
    q10: 'feat',
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
