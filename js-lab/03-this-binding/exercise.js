/**
 * 练习 E：判断 this
 * 填写 this 指向，用字符串：
 * - 'obj' 表示指向 obj 对象
 * - 'window' 表示浏览器全局（非严格普通调用）
 * - undefined 表示严格模式下独立调用
 * - '报错' 表示运行报错
 */

// 题 1
// const obj = { name: 'obj', fn() { return this; } };
// obj.fn();
const answer1 = 'obj';

// 题 2
// const obj = { name: 'obj', fn() { return this; } };
// const f = obj.fn;
// f();
const answer2 = 'window';

// 题 3
// const obj = { name: 'obj', fn: () => this };
// obj.fn();
const answer3 = 'window';

// 题 4
// function Foo() { this.name = 'Foo'; }
// const a = new Foo();
// 在 Foo 函数内部，this 指向新创建的实例，填 'a' 表示指向实例 a
const answer4 = 'a';

// 题 5
// const obj = { name: 'obj', fn() { return this.name; } };
// obj.fn.call({ name: 'other' });
const answer5 = 'other';

// ========== 验证 ==========
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const errors = [];

  if (answer1 !== 'obj') errors.push('answer1 应为 "obj"');
  if (answer2 !== 'window') errors.push('answer2 应为 "window"');
  if (answer3 !== 'window') errors.push('answer3 应为 "window"');
  if (answer4 !== 'a') errors.push('answer4 应为 "a"');
  if (answer5 !== 'other') errors.push('answer5 应为 "other"');

  out.textContent = errors.length === 0
    ? '✅ 全部正确！'
    : '❌ ' + errors.join('；');
});
