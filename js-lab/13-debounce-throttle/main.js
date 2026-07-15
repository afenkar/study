import { debounce, throttle } from './debounceThrottle.js';
import {
  runDebounceThrottleTests,
  runConceptChecks,
  conceptAnswers,
} from './exercise.js';

// 实验 A：防抖搜索
(() => {
  const out = document.getElementById('out-a');
  let reqId = 0;

  try {
    const onSearch = debounce((keyword) => {
      reqId += 1;
      out.textContent = `请求 #${reqId}：搜索「${keyword}」（停手后才发）`;
    }, 400);

    document.getElementById('search').addEventListener('input', (e) => {
      out.textContent = '输入中…（防抖等待中）';
      onSearch(e.target.value);
    });
  } catch (e) {
    out.textContent = `❌ ${e.message} — 先完成 debounce`;
  }
})();

// 实验 B：节流点击
(() => {
  const out = document.getElementById('out-b');
  let clickTotal = 0;
  let fireTotal = 0;

  try {
    const onScrollLike = throttle(() => {
      fireTotal += 1;
      out.textContent = `总点击 ${clickTotal} 次，节流实际执行 ${fireTotal} 次`;
    }, 500);

    document.getElementById('btn-scroll').addEventListener('click', () => {
      clickTotal += 1;
      out.textContent = `总点击 ${clickTotal} 次，节流实际执行 ${fireTotal} 次（触发中…）`;
      onScrollLike();
    });
  } catch (e) {
    out.textContent = `❌ ${e.message} — 先完成 throttle`;
  }
})();

// 实验 C：对照
document.getElementById('btn-c').addEventListener('click', () => {
  const lines = [
    '防抖 debounce：停止触发后再执行 → 搜索框、表单校验',
    '节流 throttle：每隔一段最多一次 → 滚动、resize、防连点',
    '',
    '共同点：都用闭包保存状态（timer / last）',
    '不同点：防抖清定时器重计时；节流看时间间隔',
  ];
  document.getElementById('out-c').textContent = lines.join('\n');
});

// 练习 E
document.getElementById('btn-e').addEventListener('click', async () => {
  const out = document.getElementById('out-e');
  out.textContent = '验证中…';
  const fnErrors = await runDebounceThrottleTests();
  const conceptErrors = runConceptChecks(conceptAnswers);
  const all = [...fnErrors, ...conceptErrors];

  out.textContent = all.length === 0
    ? '✅ debounce / throttle + 概念题全部通过！'
    : '❌ ' + all.join('；');
});
