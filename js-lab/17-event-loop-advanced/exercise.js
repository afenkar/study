/**
 * Day 17 自测答案 — 填写后验证
 * 格式：逗号分隔，如 '1,3,2'
 */
export const answers = {
  q1: ['1,3,2', '1 3 2'],
  q2: ['A,C,B', 'A C B'],
  q3: ['1,4,3,2', '1 4 3 2'],
  q4: ['c,a,d,b', 'c a d b'],
  q5: ['4,1,3,5,2', '4 1 3 5 2'],
  q6: ['start,async1,end,promise,async2,timeout', 'start async1 end promise async2 timeout'],
  q7: ['1,3,4,2', '1 3 4 2'],
  q8: ['1,4,3,2', '1 4 3 2'],
};

function normalize(str) {
  return str.trim().replace(/\s+/g, '').replace(/,/g, '').toLowerCase();
}

export function runChecks(userAnswers) {
  const errors = [];

  Object.entries(answers).forEach(([key, expectedList]) => {
    const user = userAnswers[key] || '';
    const ok = expectedList.some((exp) => normalize(user) === normalize(exp));
    if (!ok) {
      const num = key.replace('q', '');
      errors.push(`第 ${num} 题错误（参考：${expectedList[0]}）`);
    }
  });

  return errors;
}
