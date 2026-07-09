import { MyPromise } from './miniPromise.js';
import { runTests } from './exercise.js';

function log(lines, msg) {
  lines.push(msg);
  console.log(msg);
}

// 实验 A
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];
  console.group('实验 A');

  const p = new MyPromise((resolve) => {
    log(lines, '1. 创建 Promise，state = pending');
    resolve('成功');
    log(lines, '2. 调用 resolve，state → fulfilled');
  });

  p.then((val) => log(lines, `3. then 回调: ${val}`));
  log(lines, '4. 注册 then 后，同步代码继续');

  console.groupEnd();
  setTimeout(() => {
    document.getElementById('out-a').textContent = lines.join('\n');
  }, 10);
});

// 实验 B
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];
  console.group('实验 B');

  new MyPromise((resolve) => resolve(10))
    .then((v) => {
      log(lines, `then1: ${v}`);
      return v * 2;
    })
    .then((v) => log(lines, `then2: ${v}`));

  console.groupEnd();
  setTimeout(() => {
    document.getElementById('out-b').textContent = lines.join('\n');
  }, 10);
});

// 实验 C
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];
  console.group('实验 C');

  new MyPromise((_, reject) => reject('出错了'))
    .catch((reason) => log(lines, `catch: ${reason}`));

  console.groupEnd();
  setTimeout(() => {
    document.getElementById('out-c').textContent = lines.join('\n');
  }, 10);
});

// 验证
document.getElementById('btn-check').addEventListener('click', async () => {
  const out = document.getElementById('out-check');
  out.textContent = '运行中...';
  const errors = await runTests();
  out.textContent = errors.length === 0
    ? '✅ 4 个用例全部通过！'
    : '❌ ' + errors.join('；');
});
