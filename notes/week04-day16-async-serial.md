# 第 4 周 · Day 16：async/await 串行执行

> Day 15 学了并行 `Promise.all`；业务里也常要**一个接一个**跑（串行）。今天用 async/await 实现 `sleep` 和 `runSerial`。

## 今日目标

- [x] 说清串行 vs 并行的区别
- [x] 会用 `await` + `try/catch` 处理异步错误
- [x] 完成 `js-lab/16-async-serial/asyncSerial.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/16-async-serial/index.html`（Live Server 打开）

---

## 串行 vs 并行（必背）

| | 串行 serial | 并行 parallel |
|--|-------------|---------------|
| 执行 | 一个接一个 | 同时发起 |
| 耗时 | 各任务时间相加 | 约等于最慢那个 |
| 工具 | `for` + `await` / `runSerial` | `Promise.all` |
| 场景 | 有依赖、限流、按顺序写库 | 互不依赖的多接口 |

### 一句话

> **串行：上一个完了再下一个；并行：一起发，一起等。**

---

## sleep 思路

```javascript
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

`setTimeout` 本身不能 `await`，要包成 Promise。

---

## runSerial 思路

```javascript
async function runSerial(tasks) {
  const results = [];
  for (const task of tasks) {
    const val = await task(); // task 是 () => Promise
    results.push(val);
  }
  return results;
}
```

`for` + `await` 会**暂停**在循环里，等当前 task 完成再进下一轮 → 天然串行。

---

## try/catch 与 async

```javascript
async function fetchUser() {
  try {
    const res = await fetch('/api/user');
    return await res.json();
  } catch (err) {
    console.error('请求失败', err);
    throw err;
  }
}
```

`await` 后面的 Promise reject，会被 `catch` 接到。

---

## 今日 TODO（asyncSerial.js）

1. 实现 `sleep(ms)`
2. 实现 `runSerial(tasks)` — tasks 是函数数组，每个返回 Promise

---

## 笔记区

### 串行 / 并行区别（自己的话）

串行：上一个执行完再执行下一个
并行：同时发起，一起等（互不依赖时更快）

### 为什么 `for` + `await` 能实现串行？

`await` 会暂停 async 函数，当前 Promise 没 resolve 就不会进入下一轮循环

## 复盘 · 2026-07-16

- 今天学了：sleep、runSerial，串行 vs 并行，try/catch 接 await 错误
- 搞懂的一个概念：for + await 天然串行；Promise.all 并行
- 还不清楚的：无
- 明天优先：Day 17 · 事件循环进阶输出题
