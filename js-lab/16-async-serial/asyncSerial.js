/**
 * Day 16 练习：sleep + 串行执行
 * 完成 2 个 TODO，通过 exercise.js 验证
 */

// TODO 1: 返回一个在 ms 毫秒后 resolve 的 Promise
export function sleep(ms) {
  // 提示：return new Promise((resolve) => setTimeout(resolve, ms))
  // throw new Error('TODO 1: 实现 sleep');
  return new Promise((resolve)=>setTimeout(resolve,ms))
}

// TODO 2: 按顺序执行 tasks，返回结果数组
// tasks: [() => Promise, () => Promise, ...]
export async function runSerial(tasks) {
  // 提示：for (const task of tasks) { results.push(await task()) }
  // throw new Error('TODO 2: 实现 runSerial');
  let results = []
  for(const task of tasks){
    let val = await task();
    results.push(val)
  }
  return results;
}
