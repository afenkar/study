# 第1周 · 第5天：异步与事件循环

> 关联 Vue：接口请求、nextTick、Promise 都是异步；不懂事件循环，调试顺序会懵。

## 今日目标
- ✅ 理解同步 vs 异步
- ✅ 掌握 Promise 三种状态与 then/catch
- ✅ 理解宏任务 / 微任务与事件循环
- ✅ 会用 async/await 读写异步代码
- ✅ 完成 `js-lab/05-async-event-loop` 全部实验
- ✅ 完成练习 E 并通过验证

## 笔记区

### 事件循环一句话（自己的版本）
先调用栈执行同步代码，没有同步代码清空微任务，然后取一个宏任务执行，在调用栈循环

### 事件循环一句话（精炼版）
> 同步 →（一个宏任务）→ 清空所有微任务 → 下一个宏任务……

### 宏任务 vs 微任务
| 宏任务 | 微任务 |
|--------|--------|
| setTimeout / setInterval | Promise.then / catch / finally |
| script 整体 | async/await 中 await 后的代码 |
| I/O | queueMicrotask、Vue nextTick |

### async/await 一句话
是 Promise 的语法糖；async 返回 Promise；await 等待 resolve；await 后的代码是微任务。

### 力扣 2621 sleep 要点
```javascript
async function sleep(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
}
```
- setTimeout  alone 不会等，必须包在 Promise 里再 await
- `setTimeout(resolve, millis)` ✅ 不是 `() => resolve` ❌（没调用 resolve）

### 练习 E 答案
- 题1：['1','3','2']
- 题2：['A','C','B']
- 题3：['1','4','3','2']
- 题4：['c','a','d','b']

### 今天还不清楚的
（无则写「无」）

## 复盘 · 2026-07-07
- 今天学了：同步/异步、Promise、宏微任务、async/await、sleep 力扣
- 搞懂的一个概念：setTimeout 要配合 Promise + resolve 才能 await 等待
- 还不清楚的：
- 明天优先：Day 6–7 · 纯 JS Todo 综合项目
