/**
 * sleep / runSerial + 概念题验证
 */
import { sleep, runSerial } from './asyncSerial.js';

// 概念题 — 填写后验证
export const conceptAnswers = {
  q1: 'parallel', // 3 个接口互不依赖要快 → 'serial' / 'parallel'
  q2: 'serial', // for + await 是串行还是并行？'serial' / 'parallel'
  q3: 'yes', // await 的 Promise reject 能被 try/catch 接到？'yes' / 'no'
};

export async function runSerialTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const t0 = Date.now();
    await sleep(50);
    const elapsed = Date.now() - t0;
    check('用例1 sleep延迟', elapsed >= 40);

    const order = [];
    const results = await runSerial([
      async () => { order.push(1); await sleep(20); return 'a'; },
      async () => { order.push(2); return 'b'; },
      async () => { order.push(3); return 'c'; },
    ]);
    check('用例2 串行顺序', order.join('') === '123');
    check('用例2 结果数组', results[0] === 'a' && results[1] === 'b' && results[2] === 'c');

    const t1 = Date.now();
    await runSerial([
      () => sleep(30),
      () => sleep(30),
    ]);
    const serialTime = Date.now() - t1;
    check('用例3 串行耗时', serialTime >= 50);

    let caught = false;
    try {
      await runSerial([
        async () => 'ok',
        async () => { throw new Error('boom'); },
        async () => 'never',
      ]);
    } catch (e) {
      caught = e.message === 'boom';
    }
    check('用例4 错误会中断', caught);
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'parallel', // 互不依赖用并行
    q2: 'serial',   // for + await 串行
    q3: 'yes',      // try/catch 能接 await reject
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
