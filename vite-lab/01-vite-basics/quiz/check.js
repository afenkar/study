/**
 * Day 37 · Vite 概念自测答案
 */

export const answers = {
  q1: 'dist',
  q2: 'dev-server',
  q3: 'vite',
  q4: 'meta',
  q5: 'development',
  q6: 'build',
  q7: 'preview-dist',
  q8: 'hmr',
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
