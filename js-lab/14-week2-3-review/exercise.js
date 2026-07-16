/**
 * 第 2–3 周复盘 · 10 题自测（Day 8–13）
 * 先选答案，再点验证
 */

const answers = {
  q1: 'b', // call 立刻，bind 返回新函数
  q2: 'b', // 方法在 prototype
  q3: 'b', // 先 super()
  q4: 'b', // 浅拷贝
  q5: 'b', // 嵌套仍共享
  q6: 'b', // new 四步顺序
  q7: 'b', // return 对象用返回值
  q8: 'b', // 搜索用防抖
  q9: 'b', // clearTimeout 重计时
  q10: 'c', // JSON 能拷普通嵌套；局限是 function/Date 等
};

document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out');
  const errors = [];

  for (let i = 1; i <= 10; i++) {
    const key = `q${i}`;
    const el = document.getElementById(key);
    if (el.value !== answers[key]) {
      errors.push(`第 ${i} 题错误`);
    }
  }

  const score = 10 - errors.length;
  out.textContent = errors.length === 0
    ? '✅ 全部正确！10/10 — Day 8–13 过关'
    : `得分 ${score}/10。❌ ${errors.join('；')}`;
});
