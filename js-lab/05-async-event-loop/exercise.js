/**
 * 练习 E：用数组填写输出顺序
 * 例：['1', '2', '3']
 */

// 题 1
// console.log('1');
// setTimeout(() => console.log('2'), 0);
// console.log('3');
const answer1 = ['1','3','2'];

// 题 2
// console.log('A');
// Promise.resolve().then(() => console.log('B'));
// console.log('C');
const answer2 = ['A','C','B'];

// 题 3（经典）
// console.log('1');
// setTimeout(() => console.log('2'), 0);
// Promise.resolve().then(() => console.log('3'));
// console.log('4');
const answer3 = ['1','4','3','2'];

// 题 4：async 基础
// async function foo() {
//   console.log('a');
//   await Promise.resolve();
//   console.log('b');
// }
// console.log('c');
// foo();
// console.log('d');
const answer4 = ['c','a','d','b'];

// ========== 验证 ==========
document.getElementById('btn-e').addEventListener('click', () => {
  const out = document.getElementById('out-e');
  const errors = [];

  const check = (arr, expected, name) => {
    if (JSON.stringify(arr) !== JSON.stringify(expected)) {
      errors.push(`${name} 应为 ${JSON.stringify(expected)}`);
    }
  };

  check(answer1, ['1', '3', '2'], 'answer1');
  check(answer2, ['A', 'C', 'B'], 'answer2');
  check(answer3, ['1', '4', '3', '2'], 'answer3');
  check(answer4, ['c', 'a', 'd', 'b'], 'answer4');

  out.textContent = errors.length === 0
    ? '✅ 全部正确！'
    : '❌ ' + errors.join('；');
});
