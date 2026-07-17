/**
 * derived.js + 概念题验证
 */
import { nextTick } from 'vue';
import { createCartSummary, createStockWatcher } from './derived.js';

export const conceptAnswers = {
  q1: 'computed', // 总价由单价×数量算出，用？'computed' / 'watch'
  q2: 'cache', // computed 依赖不变时会？'cache' / 'recalc'（重算）
  q3: 'side-effect', // 关键词变化时发搜索请求，属于？'derived' / 'side-effect'
};

export async function runDerivedTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    const { price, quantity, total } = createCartSummary();
    check('用例1 初始总价', total.value === 200);
    price.value = 50;
    check('用例1 改 price 后 total 更新', total.value === 100);
    quantity.value = 4;
    check('用例1 改 quantity 后 total 更新', total.value === 200);

    const { stock, alerts, decrease } = createStockWatcher();
    check('用例2 初始库存', stock.value === 20);
    check('用例2 初始无告警', alerts.value.length === 0);
    decrease(11); // 20 → 9，应触发告警
    await nextTick(); // watch 默认异步，等回调执行完再断言
    check('用例2 库存低于10触发告警', alerts.value.length === 1);
    check('用例2 告警内容', alerts.value[0] === '库存告急: 9');
    decrease(2); // 9 → 7，再触发一条
    await nextTick();
    check('用例2 再次触发告警', alerts.value.length === 2);
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'computed',
    q2: 'cache',
    q3: 'side-effect',
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
