/**
 * deepClone.js + 概念题验证
 */
import { deepClone } from './deepClone.js';

// 概念题 — 填写后验证
export const conceptAnswers = {
  q1: 'shallow', // { ...obj } 是浅拷贝还是深拷贝？'shallow' / 'deep'
  q2: 'yes', // 浅拷贝改 nest.y，原对象 nest.y 会变吗？'yes' / 'no'
  q3: 'no', // JSON.stringify 能正确拷贝 function 吗？'yes' / 'no'
};

export function runCloneTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    // 用例 1：原始类型
    check('用例1 数字', deepClone(42) === 42);
    check('用例1 字符串', deepClone('hi') === 'hi');
    check('用例1 null', deepClone(null) === null);
    check('用例1 undefined', deepClone(undefined) === undefined);

    // 用例 2：一层对象（改副本不影响原对象）
    const obj = { a: 1, b: 2 };
    const c1 = deepClone(obj);
    c1.a = 99;
    check('用例2 一层对象独立', obj.a === 1 && c1.a === 99 && c1 !== obj);

    // 用例 3：嵌套对象（核心）
    const nested = { x: 1, nest: { y: 2 } };
    const c2 = deepClone(nested);
    c2.nest.y = 99;
    check('用例3 嵌套独立', nested.nest.y === 2 && c2.nest.y === 99);
    check('用例3 nest 引用不同', nested.nest !== c2.nest);

    // 用例 4：数组 + 嵌套
    const arr = [1, { z: 3 }, [4, 5]];
    const c3 = deepClone(arr);
    c3[1].z = 99;
    c3[2][0] = 88;
    check('用例4 数组嵌套独立', arr[1].z === 3 && arr[2][0] === 4);
    check('用例4 是新数组', Array.isArray(c3) && c3 !== arr);
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'shallow', // 展开运算是浅拷贝
    q2: 'yes',     // 嵌套仍共享，会变
    q3: 'no',      // function 会被丢掉
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
