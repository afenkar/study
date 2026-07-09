/**
 * 4 个用例验证 MyPromise
 */
import { MyPromise } from './miniPromise.js';

export function runTests() {
  const errors = [];

  function test(name, fn) {
    return new Promise((resolve) => {
      fn()
        .then(() => resolve(null))
        .catch((err) => resolve(`${name}: ${err.message || err}`));
    }).then((err) => {
      if (err) errors.push(err);
    });
  }

  const chain = [
    // 用例 1：resolve 基础
    test('用例1 resolve', () =>
      new Promise((resolve, reject) => {
        const p = new MyPromise((res) => res(42));
        p.then((v) => {
          if (v !== 42) reject(new Error(`期望 42，得到 ${v}`));
          else resolve();
        });
      })
    ),

    // 用例 2：then 链式
    test('用例2 链式', () =>
      new Promise((resolve, reject) => {
        new MyPromise((res) => res(1))
          .then((v) => v + 1)
          .then((v) => {
            if (v !== 2) reject(new Error(`期望 2，得到 ${v}`));
            else resolve();
          });
      })
    ),

    // 用例 3：reject + catch
    test('用例3 catch', () =>
      new Promise((resolve, reject) => {
        new MyPromise((_, rej) => rej('fail'))
          .catch((reason) => {
            if (reason !== 'fail') reject(new Error(`期望 fail，得到 ${reason}`));
            else resolve();
          });
      })
    ),

    // 用例 4：异步 resolve（executor 里 setTimeout）
    test('用例4 异步', () =>
      new Promise((resolve, reject) => {
        new MyPromise((res) => {
          setTimeout(() => res('ok'), 20);
        }).then((v) => {
          if (v !== 'ok') reject(new Error(`期望 ok，得到 ${v}`));
          else resolve();
        });
      })
    ),
  ];

  return Promise.all(chain).then(() => errors);
}
