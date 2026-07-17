/**
 * reactivity.js + 概念题验证
 */
import { createCounter, createUserForm } from './reactivity.js';

export const conceptAnswers = {
  q1: 'ref', // 基本类型 count 用？'ref' / 'reactive'
  q2: 'value', // script 里读 ref 要？'value' / 'dot'
  q3: 'no', // reactive 对象能整体替换赋值吗？'yes' / 'no'
};

export function runReactivityTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const { count, increment } = createCounter();
    check('用例1 count初始为0', count.value === 0);
    increment();
    increment();
    check('用例1 increment', count.value === 2);

    const { user, setName } = createUserForm();
    check('用例2 user是对象', typeof user === 'object' && user !== null);
    setName('李四');
    check('用例2 setName', user.name === '李四');
    user.email = 'a@b.com';
    check('用例2 直接改属性', user.email === 'a@b.com');
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'ref',
    q2: 'value',
    q3: 'no',
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
