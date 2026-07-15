# 第 2 周 · Day 1：手写简易 Promise

> 第 1 周你学了 Promise **怎么用**；今天搞懂 Promise **怎么实现**。Vue 里请求、nextTick 底层都绕不开它。

## 今日目标

- [x] 说清 Promise 三种状态与状态流转规则
- [x] 理解 `then` 为什么返回新 Promise（链式调用）
- [x] 完成 `js-lab/08-mini-promise/miniPromise.js` 中 4 个 TODO
- [x] 通过 `exercise.js` 验证（4 个用例全绿）
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/08-mini-promise/index.html`（Live Server 打开）

---

## 核心概念

### 三种状态

| 状态 | 含义 | 能再变吗 |
|------|------|----------|
| pending | 等待中 | ✅ 可以 resolve / reject |
| fulfilled | 成功 | ❌ 不可逆 |
| rejected | 失败 | ❌ 不可逆 |

### 状态流转（必背）

```
pending ──resolve(value)──▶ fulfilled
pending ──reject(reason)──▶ rejected
```

一旦 fulfilled 或 rejected，**不能再变**。

### then 做了什么？

1. 注册成功/失败回调
2. 若 Promise 已 settled，用 `queueMicrotask` **异步**执行回调（模拟微任务）
3. **返回新 Promise**，让 `.then().then()` 链式调用成为可能

### 简易版 vs 原生 Promise

| 能力 | 今日 MyPromise | 原生 Promise |
|------|----------------|--------------|
| then 链式 | ✅ | ✅ |
| catch | ✅（then 语法糖） | ✅ |
| 静态 resolve/reject | ❌ 明天补 | ✅ |
| 错误穿透、then 返回值解析 | ❌ 进阶 | ✅ |

**今日目标：能跑通 4 个基础用例即可，不追求完美 A+ 实现。**

---

## 实现步骤（对照 TODO）

### TODO 1 · constructor

- 初始化 `state = 'pending'`、`value`、`reason`
- `callbacks` 数组存 `{ onFulfilled, onRejected }`
- `executor(resolve, reject)` 立刻执行；内部 try/catch 防 executor 抛错

### TODO 2 · resolve / reject

- 仅 `pending` 时可改状态
- resolve 后遍历 callbacks 执行 `onFulfilled`
- reject 同理

### TODO 3 · then

- 返回**新** `MyPromise`
- 包装 `onFulfilled` / `onRejected`，用 `queueMicrotask` 异步调用
- 若当前已 fulfilled/rejected，也要能注册并执行

### TODO 4 · catch

- `catch(onRejected)` = `then(null, onRejected)`

---

## 笔记区

### Promise 三种状态（自己的话）

pending（等待）→ resolve → fulfilled（成功，不可逆）  
pending（等待）→ reject → rejected（失败，不可逆）

### then 为什么返回新 Promise？

见下方「Day 8 复盘检查」讲解；一句话：**为了链式调用——上一个 then 的结果是下一个 then 的输入，且整个过程仍是异步的，所以必须再包一层 Promise。**

### 今天卡在哪？

（无则写「无」—— 老师已带写一遍，建议对照注释再手敲一遍加深记忆）

### 手写 Promise 三句话（面试用）

1. **constructor**：存 state/value/reason + callbacks 队列，executor 里调 resolve/reject 改状态并通知等待者
2. **then**：返回新 Promise；pending 时登记回调，settled 时用 queueMicrotask 异步执行
3. **catch**：`then(null, onRejected)` 的语法糖

## 复盘 · 2026-07-10

- 今天学了：Promise 三种状态、constructor/then/catch 实现、语法糖
- 搞懂的一个概念：then 返回新 Promise + callbacks 队列处理异步 resolve
- 还不清楚的：then 返回值如何决定下一个 Promise 的状态（进阶，原生 Promise 会解析 thenable）
- 明天优先：Day 9 · 手写 bind ✅ 已完成
