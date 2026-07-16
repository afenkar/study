import { sleep, runSerial } from './asyncSerial.js';
import { runSerialTests, runConceptChecks, conceptAnswers } from './exercise.js';

// 实验 A
document.getElementById('btn-a').addEventListener('click', async () => {
  const out = document.getElementById('out-a');
  out.textContent = '等待 1 秒…';
  try {
    const t0 = Date.now();
    await sleep(1000);
    out.textContent = `sleep(1000) 完成，实际等待约 ${Date.now() - t0} ms`;
  } catch (e) {
    out.textContent = `❌ ${e.message}`;
  }
});

// 实验 B
document.getElementById('btn-b').addEventListener('click', async () => {
  const out = document.getElementById('out-b');
  out.textContent = '运行中…';
  try {
    const task = () => sleep(200);

    const t1 = Date.now();
    await runSerial([task, task, task]);
    const serialMs = Date.now() - t1;

    const t2 = Date.now();
    await Promise.all([task(), task(), task()]);
    const parallelMs = Date.now() - t2;

    out.textContent = [
      `串行 runSerial：约 ${serialMs} ms（≈ 200×3）`,
      `并行 Promise.all：约 ${parallelMs} ms（≈ 200）`,
      '',
      '结论：互不依赖时用并行更快',
    ].join('\n');
  } catch (e) {
    out.textContent = `❌ ${e.message}`;
  }
});

// 实验 C
document.getElementById('btn-c').addEventListener('click', async () => {
  const out = document.getElementById('out-c');
  out.textContent = '运行中…';

  async function mayFail(ok) {
    await sleep(50);
    if (!ok) throw new Error('接口 404');
    return '成功';
  }

  try {
    await mayFail(false);
    out.textContent = '❌ 预期应失败';
  } catch (e) {
    out.textContent = `try/catch 接到异步错误 → ${e.message}\n（await reject 和同步 throw 一样能被 catch）`;
  }
});

// 练习 E
document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runSerialTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ sleep / runSerial + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
