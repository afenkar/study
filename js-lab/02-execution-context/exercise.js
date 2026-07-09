/**
 * 练习 E：预测输出
 * 在对应变量里填写你的预测（字符串），例如 'undefined'、'10'、'报错'
 * 填完点 index.html 里的「验证练习」
 */

// 题 1
// var m;
// console.log(m);  // 预测？
const answer1 = 'undefined';

// 题 2
// console.log(n);
// var n = 5;
// console.log(n);
// 用数组表示两次输出，例如 ['undefined', '5']
const answer2 = ['undefined','5'];

// 题 3
// console.log(typeof fn);
// var fn = function () {};
// fn();
// 两次结果：typeof fn 和 fn() 调用
// fn 赋值前 typeof 是 'undefined'，调用会报错
const answer3 = ['undefined','报错'];

// 题 4
// function test() {
//   console.log(p);
//   var p = 100;
//   console.log(p);
// }
// test();
const answer4 = ['undefined','100'];

// ========== 验证（不要修改） ==========
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const errors = [];

  if (answer1 !== 'undefined') errors.push('题1 应为 undefined');
  if (JSON.stringify(answer2) !== JSON.stringify(['undefined', '5'])) {
    errors.push('题2 应为 ["undefined", "5"]');
  }
  if (JSON.stringify(answer3) !== JSON.stringify(['undefined', '报错'])) {
    errors.push('题3 应为 ["undefined", "报错"]');
  }
  if (JSON.stringify(answer4) !== JSON.stringify(['undefined', '100'])) {
    errors.push('题4 应为 ["undefined", "100"]');
  }

  if (errors.length === 0) {
    out.textContent = '✅ 全部正确！';
  } else {
    out.textContent = '❌ ' + errors.join('；') + '\n\n提示：先在纸上预测，再对照实验 A-D';
  }
});
