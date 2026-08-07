# JS 手写题 · 闭卷默写清单

> 和项目 FAQ、Vue 口述一起准备。目标：**纸上/白板能写出对的版本**，不是背长篇。  
> 你 mock 第 8 题防抖曾写挂，优先把 **P0 前 4 题** 练到闭卷满分。

**用法：** 每题先空白纸写 → 对照参考 → 勾选。口诀写进「我的坑」。

---

## 优先级（真实频率）

| 档 | 题 | 建议 |
|----|-----|------|
| **P0 必会** | 防抖、节流、深拷贝、`myNew`、`myBind`、`Promise.all` | 每天默写 1～2 个 |
| **P1 加分** | `Promise.race`、`sleep`、简易 Promise 口述、数组扁平 | 能写更好 |
| **P2 了解** | 完整 Promise A+、带 new 的 bind、循环引用 deepClone | 时间紧可口述思路 |

对应笔记：`notes/week03-day13`、`week02-day11`、`week03-day12`、`week02-day09`、`week04-day15`

---

## P0-1 防抖 debounce

**一句话：** 连续触发只认最后一次，停够 `delay` 才执行。

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**易错（你 mock 踩过）：**
1. 必须先 `clearTimeout` 再 `setTimeout`
2. 用 `fn.apply(this, args)`，别写成 `apply(fn, args)`
3. 箭头函数是 `=>`，逗号用英文 `,`

**口述场景：** 搜索框输入、resize 结束再算布局。  
- [ ]

**我的坑：**

---

## P0-2 节流 throttle

**一句话：** 一段时间内最多执行一次（时间戳版最稳）。

```javascript
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

**和防抖对比（必背）：**

| | 防抖 | 节流 |
|--|------|------|
| 行为 | 停了才触发 | 固定节奏触发 |
| 场景 | 搜索、提交防连点 | 滚动、拖拽、按钮限频 |

- [ ]

**我的坑：**

---

## P0-3 深拷贝 deepClone（对象 + 数组够用）

**一句话：** 原始值直接返回；数组/对象递归新建。

```javascript
function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map((item) => deepClone(item));
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = deepClone(value[key]);
  }
  return result;
}
```

**口述加分：** `{ ...obj }` / `Object.assign` 是浅拷贝；`JSON.parse(JSON.stringify)` 丢 function/undefined/Date；循环引用要 WeakMap，面试可说「简单版递归，进阶用 Map 防环」。

- [ ]

**我的坑：**

---

## P0-4 手写 new（myNew）

**口诀：** 建对象 → 连原型 → 当 this 调 → 决定返回谁。

```javascript
function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const result = Ctor.apply(obj, args);
  return result !== null && typeof result === 'object' ? result : obj;
}
```

**经典坑：** 构造函数 `return` 对象 → 用返回值；`return` 原始值 → 忽略，仍用 `obj`。

- [ ]

**我的坑：**

---

## P0-5 手写 bind（myBind）

**一句话：** 闭包锁住 `this` + 预置参数，返回新函数，调用时再 `apply`。

```javascript
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(thisArg, [...boundArgs, ...callArgs]);
  };
};
```

**对比（口头）：** call/apply 立刻执行；bind 返回新函数。call 逐个传参，apply 传数组。

- [ ]

**我的坑：**

---

## P0-6 Promise.all（myAll）

**一句话：** 全成功才 resolve（按下标放结果）；任一失败立刻 reject。

```javascript
function myAll(promises) {
  return new Promise((resolve, reject) => {
    const list = [...promises];
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) {
      resolve([]);
      return;
    }
    list.forEach((p, i) => {
      Promise.resolve(p).then((val) => {
        results[i] = val;
        done += 1;
        if (done === list.length) resolve(results);
      }, reject);
    });
  });
}
```

**易错：** 不能 `push`（完成顺序乱）；空数组要立刻 `resolve([])`；用 `Promise.resolve` 兼容非 Promise。

- [ ]

**我的坑：**

---

## P1-1 Promise.race

```javascript
function myRace(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}
```

**场景：** 超时赛跑——`Promise.race([fetch(url), sleep(3000).then(() => Promise.reject('timeout'))])`。

- [ ]

---

## P1-2 sleep + 串行

```javascript
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runSerial(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
```

**对比：** `for + await` 串行；`Promise.all` 并行。

- [ ]

---

## P1-3 数组扁平 flatten（一层 / 无限）

```javascript
// 无限扁平
function flatten(arr) {
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  );
}

// 或：arr.flat(Infinity) —— 面试说得出手写即可
```

- [ ]

---

## P1-4 简易 Promise（口述即可，不必默写全量）

**三句话：**
1. constructor：存 state/value + callbacks，executor 里 resolve/reject 改状态并通知
2. then：返回新 Promise；pending 登记，settled 用 `queueMicrotask` 异步跑
3. catch：`then(null, onRejected)`

完整实现对照：`js-lab/08-mini-promise`、`notes/week02-day01-mini-promise.md`。

- [ ]

---

## 白板模板（现场怎么写）

1. **先写函数签名 + 注释一句话意图**（给面试官看思路）
2. **闭包变量**写在外层（`timer` / `last` / `done`）
3. **return function** 里再写核心逻辑
4. **边写边说**：「先清定时器」「结果按索引放」
5. 写完自测一句：`debounce(fn, 300)` 连点 5 次会怎样？

---

## 和 40WEB 项目串起来（加分）

| 手写题 | 项目里哪用到 |
|--------|----------------|
| 防抖 | 搜索框 / 频繁改参可防抖再提交（口述即可） |
| 节流 | 滚动、窗口 resize |
| Abort / 取消请求 | 你做的 `resetNavigationRequests`（比手写 cancel 更贴项目） |
| Promise.all | 多接口并行拉配置（若有） |
| 深拷贝 | 表单编辑草稿、避免直接改 store 里的嵌套对象 |

面试官问「手写过什么」→ 答：**防抖节流、深拷贝、new/bind、Promise.all**，再补一句项目里用 abort 取消过期请求。

---

## 7 日默写计划（每天 15～20 分钟）

| Day | 默写 | 对照笔记 |
|-----|------|----------|
| 1 | debounce + throttle | week03-day13 |
| 2 | deepClone + 口述浅拷贝坑 | week02-day11 |
| 3 | myNew | week03-day12 |
| 4 | myBind + call/apply 对比 | week02-day09 |
| 5 | myAll + myRace | week04-day15 |
| 6 | sleep / runSerial + flatten | week04-day16 |
| 7 | 闭卷混考：随机抽 3 个默写 | 本文参考答案 |

过关：**任意抽 P0，5 分钟内写出且能讲清「为什么」**。

---

## 自测表

| 题 | 闭卷写出 | 能讲场景 |
|----|----------|----------|
| debounce | ☐ | ☐ |
| throttle | ☐ | ☐ |
| deepClone | ☐ | ☐ |
| myNew | ☐ | ☐ |
| myBind | ☐ | ☐ |
| myAll | ☐ | ☐ |
| myRace | ☐ | ☐ |
| sleep/串行 | ☐ | ☐ |
