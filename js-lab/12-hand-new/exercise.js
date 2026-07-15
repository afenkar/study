/**
 * myNew.js + 概念题验证
 */
import { myNew } from './myNew.js';

// 概念题 — 填写后验证
export const conceptAnswers = {
  q1: 'Ctor.prototype', // new 会把实例的原型连到？'Ctor.prototype' / 'Ctor'
  q2: 'returned', // 构造函数 return {a:1} 时，new 得到？'returned' / 'this'
  q3: 'this', // 构造函数 return 123 时，new 得到？'returned' / 'this'
};

export function runNewTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    // 用例 1：基本属性 + 原型方法
    function Person(name) {
      this.name = name;
    }
    Person.prototype.sayHi = function () {
      return `Hi, ${this.name}`;
    };

    const p = myNew(Person, '张三');
    check('用例1 属性', p.name === '张三');
    check('用例1 原型方法', typeof p.sayHi === 'function' && p.sayHi() === 'Hi, 张三');
    check('用例1 instanceof', p instanceof Person);
    check('用例1 原型链', Object.getPrototypeOf(p) === Person.prototype);

    // 用例 2：多参数
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    const pt = myNew(Point, 3, 4);
    check('用例2 多参数', pt.x === 3 && pt.y === 4);

    // 用例 3：return 对象 → 用返回值
    function ReturnsObj() {
      this.x = 1;
      return { y: 2 };
    }
    const r1 = myNew(ReturnsObj);
    check('用例3 return对象', r1.y === 2 && r1.x === undefined);

    // 用例 4：return 原始值 → 忽略，用 this
    function ReturnsPrimitive() {
      this.x = 1;
      return 123;
    }
    const r2 = myNew(ReturnsPrimitive);
    check('用例4 return原始值', r2.x === 1 && !(r2 === 123));
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'Ctor.prototype', // 连到构造函数的 prototype
    q2: 'returned',       // return 对象时用返回值
    q3: 'this',           // return 原始值时仍用 this
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
