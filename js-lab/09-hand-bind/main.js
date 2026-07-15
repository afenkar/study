import './myBind.js'; // 确保实验 B 和验证都能用到 myBind
import { runBindTests } from './exercise.js';

function greet(greeting, punct) {
  return `${greeting}，我是 ${this.name}${punct}`;
}

// 实验 A
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];
  const a = { name: 'Alice' };
  const b = { name: 'Bob' };

  lines.push(`call:  ${greet.call(a, '你好', '!')}`);
  lines.push(`apply: ${greet.apply(b, ['Hi', '.'])}`);

  const bound = greet.bind(a, '哈喽');
  lines.push(`bind:  ${bound('~')}（绑定了 this + 第一个参数）`);
  lines.push('');
  lines.push('call/apply → 立刻执行');
  lines.push('bind     → 返回新函数，this 永久绑定');

  document.getElementById('out-a').textContent = lines.join('\n');
});

// 实验 B
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];
  const counter = { count: 0, add() { this.count += 1; return this.count; } };

  lines.push(`直接调用 counter.add() → ${counter.add()}`);

  const raw = counter.add;
  try {
    raw();
    lines.push(`拆出来 raw() 后 count = ${counter.count}（this 丢失，加到了 window）`);
  } catch (e) {
    // ES module 默认严格模式：独立调用时 this 是 undefined，会报错
    lines.push(`拆出来 raw() 报错：${e.message}`);
    lines.push('（module 严格模式下 this=undefined，比 window 更明显）');
  }

  counter.count = 0;
  const fixed = counter.add.myBind(counter);
  fixed();
  lines.push(`myBind 后 fixed() → count = ${counter.count} ✅`);

  document.getElementById('out-b').textContent = lines.join('\n');
});

// 验证
document.getElementById('btn-check').addEventListener('click', () => {
  const out = document.getElementById('out-check');
  const errors = runBindTests();
  out.textContent = errors.length === 0
    ? '✅ 4 个用例全部通过！'
    : '❌ 失败：' + errors.join('；');
});
