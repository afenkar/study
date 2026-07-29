/**
 * Day 34 · 校验逻辑（不用改）
 */
export function runScenarioChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'v-show',
    q2: 'v-if',
    q3: 'display',
    q4: 'id',
    q5: 'reorder-bug',
    q6: 'import-fn',
    q7: 'computed',
    q8: 'lazy',
    q9: 'keep-alive',
    q10: 'measure',
  };

  Object.entries(expected).forEach(([k, v]) => {
    if (!answers[k]) errors.push(`第 ${k.replace('q', '')} 题未填写`);
    else if (answers[k] !== v) errors.push(`第 ${k.replace('q', '')} 题错误`);
  });

  return errors;
}
