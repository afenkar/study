function log(lines, msg) {
  lines.push(msg);
  console.log(msg);
}

// ========== 实验 A：同步 vs 异步 ==========
document.getElementById('btn-a').addEventListener('click', () => {
  const lines = [];
  lines.push('--- 预测：1 → 3 → 2 ---');

  console.group('实验 A');
  log(lines, '1 同步');
  setTimeout(() => log(lines, '2 宏任务 setTimeout'), 0);
  log(lines, '3 同步');
  console.groupEnd();

  document.getElementById('out-a').textContent = lines.join('\n');
});

// ========== 实验 B：Promise 微任务 ==========
document.getElementById('btn-b').addEventListener('click', () => {
  const lines = [];
  lines.push('--- 预测：A → C → B ---');

  console.group('实验 B');
  log(lines, 'A 同步');
  Promise.resolve().then(() => log(lines, 'B 微任务 Promise.then'));
  log(lines, 'C 同步');
  console.groupEnd();

  setTimeout(() => {
    document.getElementById('out-b').textContent = lines.join('\n');
  }, 10);
  document.getElementById('out-b').textContent = '运行中...';
});

// ========== 实验 C：宏任务 vs 微任务 ==========
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [];
  lines.push('--- 预测：1 → 6 → 3 → 5 → 4 → 2 → 7 ---');

  console.group('实验 C');
  log(lines, '1 同步');

  setTimeout(() => log(lines, '2 宏任务'), 0);

  Promise.resolve().then(() => {
    log(lines, '3 微任务 then1');
    Promise.resolve().then(() => log(lines, '4 微任务 then2'));
  });

  Promise.resolve().then(() => log(lines, '5 微任务 then3'));

  log(lines, '6 同步');

  setTimeout(() => log(lines, '7 宏任务'), 0);
  console.groupEnd();

  setTimeout(() => {
    document.getElementById('out-c').textContent = lines.join('\n');
  }, 50);
  document.getElementById('out-c').textContent = '运行中...';
});

// ========== 实验 D：async / await ==========
document.getElementById('btn-d').addEventListener('click', async () => {
  const lines = [];

  function delay(ms, val) {
    return new Promise((resolve) => setTimeout(() => resolve(val), ms));
  }

  async function demo() {
    log(lines, '1 start');
    const result = await delay(100, '数据');
    log(lines, `2 await 得到: ${result}`);
    log(lines, '3 end');
  }

  console.group('实验 D');
  log(lines, '0 调用 demo 前');
  demo();
  log(lines, '0 demo 调用后（await 不会阻塞这里）');
  console.groupEnd();

  setTimeout(() => {
    document.getElementById('out-d').textContent = lines.join('\n');
  }, 200);
  document.getElementById('out-d').textContent = '运行中...';
});
