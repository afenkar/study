/**
 * debounce / throttle + 概念题验证
 */
import { debounce, throttle } from './debounceThrottle.js';

// 概念题 — 填写后验证
export const conceptAnswers = {
  q1: 'debounce', // 搜索框输入用？'debounce' / 'throttle'
  q2: 'throttle', // 页面滚动加载用？'debounce' / 'throttle'
  q3: 'clearTimeout', // 防抖核心手段是？'clearTimeout' / 'Date.now'
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runDebounceThrottleTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    // 用例 1：防抖 — 连续调用，只执行最后一次
    let debounceCount = 0;
    let lastArg = null;
    const d = debounce((v) => {
      debounceCount += 1;
      lastArg = v;
    }, 40);

    d('a');
    d('b');
    d('c');
    await sleep(80);
    check('用例1 防抖只执行一次', debounceCount === 1);
    check('用例1 防抖用最后参数', lastArg === 'c');

    // 用例 2：防抖 — 间隔够长会执行多次
    let debounceCount2 = 0;
    const d2 = debounce(() => {
      debounceCount2 += 1;
    }, 30);
    d2();
    await sleep(50);
    d2();
    await sleep(50);
    check('用例2 防抖间隔够则多次', debounceCount2 === 2);

    // 用例 3：节流 — 短时间多次调用，只执行有限次
    let throttleCount = 0;
    const t = throttle(() => {
      throttleCount += 1;
    }, 50);
    t();
    t();
    t();
    check('用例3 节流首次立即执行', throttleCount === 1);
    await sleep(60);
    t();
    check('用例3 节流间隔后可再执行', throttleCount === 2);
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'debounce',    // 搜索等停手
    q2: 'throttle',    // 滚动按频率
    q3: 'clearTimeout', // 防抖靠清定时器重计时
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
