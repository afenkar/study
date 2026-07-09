/**
 * 练习：实现 createMultiplier
 *
 * 要求：
 * - createMultiplier(n) 返回一个函数
 * - 返回的函数接收一个数字 x，返回 x * n
 * - n 被「闭包」保存，外部无法直接修改
 *
 * 示例：
 *   const double = createMultiplier(2);
 *   double(5)  // 10
 *   double(3)  // 6
 */

function createMultiplier(n) {
  return function(x) {
    return x * n;
  }
  // TODO: 在这里完成你的代码
  // 提示：return 一个函数，该函数使用参数 n
}

// ========== 验证（不要修改下面） ==========
document.getElementById('btn-d').addEventListener('click', () => {
  const out = document.getElementById('out-d');

  try {
    const triple = createMultiplier(3);
    const double = createMultiplier(2);

    const r1 = triple(4);
    const r2 = double(5);
    const r3 = triple(10);

    if (r1 === 12 && r2 === 10 && r3 === 30) {
      out.textContent = '✅ 通过！triple(4)=12, double(5)=10, triple(10)=30';
    } else {
      out.textContent = `❌ 结果不对：triple(4)=${r1}, double(5)=${r2}, triple(10)=${r3}`;
    }
  } catch (e) {
    out.textContent = `❌ 报错：${e.message}`;
  }
});
