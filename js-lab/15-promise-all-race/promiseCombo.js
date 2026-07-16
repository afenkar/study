/**
 * Day 15 练习：手写 Promise.all / Promise.race
 * 完成 2 个 TODO，通过 exercise.js 验证
 */

// TODO 1: 全部成功 → 按顺序返回结果数组；任一失败立刻 reject
export function myAll(promises) {
  // 提示：
  // - new Promise
  // - Promise.resolve(p) 兼容普通值
  // - results[i] = val（不要 push）
  // - 空数组立刻 resolve([])
  // throw new Error('TODO 1: 实现 myAll');
  return new Promise((resolve,reject)=>{
    const list = [...promises];
    const results = new Array(list.length);
    let done = 0;
    if(list.length === 0){
      resolve([]);
      return;
    }
    list.forEach((p,i)=>{
      Promise.resolve(p).then((val)=>{
        results[i] = val;
        done += 1;
        if(done === list.length)resolve(results); 
      },reject)
    })
  })
}

// TODO 2: 谁先 settled 用谁（成功 resolve / 失败 reject）
export function myRace(promises) {
  // 提示：对每个 p 做 Promise.resolve(p).then(resolve, reject)
  // throw new Error('TODO 2: 实现 myRace');
  return new Promise((resolve,reject)=>{
    for(const p of promises){
      Promise.resolve(p).then(resolve,reject);
    }
  })
}
