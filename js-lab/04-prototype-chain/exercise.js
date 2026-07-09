/**
 * 练习 E
 */

// 题 1：预测输出（字符串）
// function Parent() {}
// Parent.prototype.val = 1;
// const p = new Parent();
// console.log(p.val);
// console.log(Object.hasOwn(p, 'val'));
const answer1_output = '1';       // p.val 的值
const answer1_hasOwn = 'false';       // 'true' 或 'false'

// 题 2：手写 — 让 child 能访问 parent 上的 name，且 child 自身没有 name
// 要求：使用 Object.create
const parent = { name: 'parent' };
function createChild(parent) {
  const child = Object.create(parent);
  return child;
  // TODO
}
const child = createChild(parent);

// 题 3：预测
// function Foo() {}
// const f = new Foo();
// f instanceof Foo → 填 'true' 或 'false'
// f instanceof Object → 填 'true' 或 'false'
const answer3a = 'true';
const answer3b = 'true';

// ========== 验证 ==========
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const errors = [];

  if (answer1_output !== '1') errors.push('题1 p.val 应为 "1"');
  if (answer1_hasOwn !== 'false') errors.push('题1 hasOwn 应为 "false"');

  try {
    const parent = { name: 'parent' };
    const child = createChild(parent);
    if (!child || child.name !== 'parent') errors.push('题2 child.name 应能读到 parent');
    if (Object.hasOwn(child, 'name')) errors.push('题2 child 自身不应有 name');
  } catch (e) {
    errors.push('题2 报错：' + e.message);
  }

  if (answer3a !== 'true') errors.push('题3a 应为 "true"');
  if (answer3b !== 'true') errors.push('题3b 应为 "true"');

  out.textContent = errors.length === 0
    ? '✅ 全部正确！'
    : '❌ ' + errors.join('；');
});
