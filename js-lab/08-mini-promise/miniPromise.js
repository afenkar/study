/**
 * MyPromise — 简易 Promise 实现（第 2 周 Day 1）
 *
 * 整体思路（先建立画面）：
 * 1. constructor：存状态 + 存「将来要执行的回调」+ 提供 resolve/reject
 * 2. then：往 callbacks 里登记回调；若已经 settled 就立刻触发
 * 3. catch：就是 then(null, onRejected)
 */

export class MyPromise {
  constructor(executor) {
    // ① 三个「盒子」：状态、成功值、失败原因
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    

    // ② 等待队列：then 注册时若还是 pending，先存这里
    this.callbacks = []
    // ③ resolve：只能 pending → fulfilled，然后通知所有等待者
    const resolve = (val) =>{
      if(this.state !== 'pending')return;
      this.state = 'fulfilled'
      this.value = val
      this.callbacks.forEach((cb)=>cb.onFulfilled(val))
    }

    // ④ reject：只能 pending → rejected
    const reject = (reason) =>{
      if(this.state !== 'pending')return;
      this.state = 'reject'
      this.reason = reason
      this.callbacks.forEach((cb)=>cb.onRejected(reason))
    }

    // ⑤ 立刻执行用户传入的 executor（和原生 Promise 一样）
    try{
      executor(resolve,reject)
    }catch(err){
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // then 必须返回「新 Promise」，链式 .then().then() 才成立
    return new MyPromise((resolve, reject) => {
      // 统一处理：异步执行回调，并把返回值 resolve 给下一个 then
      const handle = (fn, val) => {
        queueMicrotask(() => {
          try {
            // 没传回调函数就透传 value/reason
            const result = typeof fn === 'function' ? fn(val) : val;
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === 'fulfilled') {
        // 已经成功：微任务里跑成功回调
        handle(onFulfilled, this.value);
      } else if (this.state === 'rejected') {
        // 已经失败：微任务里跑失败回调
        handle(onRejected, this.reason);
      } else {
        // 还在 pending：先登记，等 resolve/reject 时再触发
        this.callbacks.push({
          onFulfilled: (val) => handle(onFulfilled, val),
          onRejected: (reason) => handle(onRejected, reason),
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
