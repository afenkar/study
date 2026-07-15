/**
 * Day 13 练习：手写防抖 / 节流
 * 完成 2 个 TODO，通过 exercise.js 验证
 */

// TODO 1: 防抖 — 停止触发 wait ms 后才执行最后一次
export function debounce(fn, wait) {
  // 提示：闭包保存 timer → 每次先 clearTimeout → 再 setTimeout
  // throw new Error('TODO 1: 实现 debounce');
  let timer = null;
  return function(...args){
    clearTimeout(timer);
    timer=setTimeout(() => {
      fn.apply(this,args)
    }, wait);
  }
}

// TODO 2: 节流 — 每隔 wait ms 最多执行一次（时间戳版）
export function throttle(fn, wait) {
  // 提示：闭包保存 last 时间戳 → now - last >= wait 才执行并更新 last
  // throw new Error('TODO 2: 实现 throttle');
  let last = 0;
  return function(...args){
    let now = Date.now();
    if(now-last >= wait){
      last = now;
      fn.apply(this,args)
    }
  }
}
