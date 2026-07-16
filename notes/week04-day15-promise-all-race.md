# 第 4 周 · Day 15：Promise.all 与 Promise.race

> Day 8 你实现了单个 Promise；业务里常要「等一批都完成」或「谁先完成用谁」。今天手写 `myAll` / `myRace`。

## 今日目标

- [x] 说清 `Promise.all` 与 `Promise.race` 的区别
- [x] 知道 all 失败短路、全部成功才 resolve
- [x] 完成 `js-lab/15-promise-all-race/promiseCombo.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/15-promise-all-race/index.html`（Live Server 打开）

---

## all vs race（必背）

| | Promise.all | Promise.race |
|--|-------------|--------------|
| 成功 | **全部**成功 → 按顺序返回结果数组 | **最先** settled 的那个（成功则 resolve） |
| 失败 | **任意一个**失败立刻 reject | **最先** settled 的那个（失败则 reject） |
| 场景 | 并行请求，都要齐 | 超时控制、赛跑取最快 |

### 一句话

> **all：全到齐才算；race：谁先到用谁。**

---

## Promise.all 思路

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
      Promise.resolve(p).then(
        (val) => {
          results[i] = val;
          done += 1;
          if (done === list.length) resolve(results);
        },
        reject // 任一失败立刻 reject
      );
    });
  });
}
```

要点：

1. 用 `Promise.resolve(p)` 兼容非 Promise 值
2. 结果要**按原下标**放，不能 push（完成顺序可能乱）
3. 空数组 → 立刻 `resolve([])`

---

## Promise.race 思路

```javascript
function myRace(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}
```

谁先 then/catch，就决定外层 Promise 的结果（后续再来也改不了）。

---

## 今日 TODO（promiseCombo.js）

1. 实现 `myAll(iterable)`
2. 实现 `myRace(iterable)`

---

## 笔记区

### all / race 区别（自己的话）

all：全部 resolve 才 resolve；任一 reject 立刻 reject
race：返回最先 settled 的那个（成功或失败都算）

### 为什么 all 的结果不能用 push，要用下标赋值？

完成顺序可能和传入顺序不一样，用 `results[i] = val` 才能保持原数组顺序

## 复盘 · 2026-07-16

- 今天学了：手写 myAll / myRace，all 失败短路，reject 要放进 then 第二个参数
- 搞懂的一个概念：all 全到齐才算；race 谁先到用谁
- 还不清楚的：无
- 明天优先：Day 16 · async/await 串行执行
