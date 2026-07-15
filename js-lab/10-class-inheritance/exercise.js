/**
 * shapes.js + 概念题验证
 */
import { Shape, Circle, Rect } from './shapes.js';

// 概念题 — 填写后验证
export const conceptAnswers = {
  q1: 'true', // Person.prototype 有 hi 吗？'true'/'false'
  q2: 'super', // 子类 constructor 必须先调？'super' / 'this'
  q3: 'false', // 静态方法能在实例上直接调吗？'true'/'false'
};

export function runShapeTests() {
  const errors = [];

  function near(a, b) {
    return Math.abs(a - b) < 0.001;
  }

  try {
    const s = new Shape('red');
    if (typeof s.describe !== 'function') throw new Error('Shape.describe 未实现');
    const desc = s.describe();
    if (!desc.includes('red')) errors.push('Shape.describe 应包含颜色');
  } catch (e) {
    errors.push('TODO 1: ' + e.message);
  }

  try {
    const c = new Circle('blue', 2);
    if (!(c instanceof Shape)) errors.push('Circle 应继承 Shape');
    if (!near(c.area(), Math.PI * 4)) errors.push('Circle.area 应为 πr²');
    if (!c.describe().includes('blue')) errors.push('Circle.describe 应调 super');
  } catch (e) {
    errors.push('TODO 2: ' + e.message);
  }

  try {
    const r = new Rect('green', 3, 4);
    if (!(r instanceof Shape)) errors.push('Rect 应继承 Shape');
    if (r.area() !== 12) errors.push('Rect.area 应为 12');
  } catch (e) {
    errors.push('TODO 3: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'true',   // class 方法在 prototype 上
    q2: 'super',  // 子类 constructor 必须先调
    q3: 'false',  // 实例不能调 static（除非通过类）
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
