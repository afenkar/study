/**
 * myBind 4 用例验证
 */
import './myBind.js';

export function runBindTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  // 用例 1：基本 this 绑定
  const obj1 = { x: 10 };
  function getX() { return this.x; }
  check('用例1 this绑定', getX.myBind(obj1)() === 10);

  // 用例 2：bind 后再 call 也改不了 this
  const obj2 = { x: 1 };
  const obj3 = { x: 999 };
  const bound = getX.myBind(obj2);
  check('用例2 永久绑定', bound.call(obj3) === 1);

  // 用例 3：参数合并（绑定时 + 调用时）
  function sum(a, b, c) { return a + b + c; }
  const boundSum = sum.myBind(null, 1, 2);
  check('用例3 参数合并', boundSum(3) === 6);

  // 用例 4：setTimeout 场景（模拟 this 丢失修复）
  const counter = {
    count: 0,
    inc() { this.count += 1; return this.count; },
  };
  const boundInc = counter.inc.myBind(counter);
  boundInc();
  check('用例4 counter场景', counter.count === 1);

  return errors;
}
