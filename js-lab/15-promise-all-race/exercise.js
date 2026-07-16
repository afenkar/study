/**
 * myAll / myRace + 概念题验证
 */
import { myAll, myRace } from './promiseCombo.js';

// 概念题 — 填写后验证
export const conceptAnswers = {
  q1: 'yes', // all 要等全部成功？'yes' / 'no'
  q2: 'yes', // all 有一个失败会立刻 reject？'yes' / 'no'
  q3: 'first', // race 取的是？'first' / 'all'
};

function delay(ms, value, shouldReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) reject(value);
      else resolve(value);
    }, ms);
  });
}

export async function runComboTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    // 用例 1：all 全部成功，顺序正确（后完成的放前面下标）
    const allOk = await myAll([
      delay(30, 'a'),
      Promise.resolve('b'),
      delay(10, 'c'),
    ]);
    check(
      '用例1 all顺序',
      Array.isArray(allOk) && allOk[0] === 'a' && allOk[1] === 'b' && allOk[2] === 'c'
    );

    // 用例 2：all 兼容非 Promise
    const mixed = await myAll([1, Promise.resolve(2), 3]);
    check('用例2 all普通值', mixed[0] === 1 && mixed[1] === 2 && mixed[2] === 3);

    // 用例 3：all 空数组
    const empty = await myAll([]);
    check('用例3 all空数组', Array.isArray(empty) && empty.length === 0);

    // 用例 4：all 失败短路
    let allRejected = false;
    try {
      await myAll([delay(10, 'ok'), delay(5, 'boom', true)]);
    } catch (e) {
      allRejected = e === 'boom';
    }
    check('用例4 all失败短路', allRejected);

    // 用例 5：race 取最快成功的
    const raceOk = await myRace([delay(40, 'slow'), delay(10, 'fast')]);
    check('用例5 race最快成功', raceOk === 'fast');

    // 用例 6：race 最快失败也算
    let raceRejected = false;
    try {
      await myRace([delay(40, 'slow'), delay(5, 'fail', true)]);
    } catch (e) {
      raceRejected = e === 'fail';
    }
    check('用例6 race最快失败', raceRejected);
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'yes',  // 全部成功才 resolve
    q2: 'yes',  // 任一失败立刻 reject
    q3: 'first', // 最先 settled
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (answers[k] !== v) errors.push(`概念题 ${k} 应为 ${v}`);
  });
  return errors;
}
