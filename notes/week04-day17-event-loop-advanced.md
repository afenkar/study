# 第 4 周 · Day 17：事件循环进阶 · async 输出题

> Day 5 入门了宏/微任务；Day 16 用了 async/await。今天用**经典输出题**把顺序彻底练熟——面试高频。

## 今日目标

- [x] 默写事件循环一句话
- [x] 能分析 async + await + Promise + setTimeout 混合题
- [x] 完成 `js-lab/17-event-loop-advanced` 自测（8 题）
- [x] 错题先预测再 F12 验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/17-event-loop-advanced/index.html`（Live Server 打开）

---

## 事件循环（复习必背）

> **同步 → 执行一个宏任务 → 清空所有微任务 → 下一个宏任务……**

| 宏任务 | 微任务 |
|--------|--------|
| setTimeout / setInterval | Promise.then / catch / finally |
| script 整体 | **await 后面的代码** |
| I/O | queueMicrotask |

### async/await 关键

- `async function` 里 **await 之前** = 同步执行
- 遇到 `await`，后面代码相当于 `.then` → **微任务**
- `await async2()` 会先执行 async2 里 await 前的同步部分

---

## 经典题 1：async1 / async2（必背）

```javascript
async function async1() {
  console.log('1');
  await async2();
  console.log('2');
}
async function async2() {
  console.log('3');
}
console.log('4');
async1();
console.log('5');
```

**输出：`4 → 1 → 3 → 5 → 2`**

拆解：

1. 同步：`4`
2. async1 同步部分：`1`
3. await async2() → async2 同步：`3`，然后 async1 在 `2` 前暂停
4. 同步：`5`
5. 微任务：async1 恢复 → `2`

---

## 分析步骤（做题模板）

1. 先标出**所有同步** console.log
2. 标出 **await / .then** 后面的 → 微任务
3. 标出 **setTimeout** → 宏任务（等微任务清空后才轮到）
4. 微任务里若再产生微任务，按入队顺序排

---

## 笔记区

### 事件循环一句话（自己的话）

同步代码 → 清空所有微任务 → 取下一个宏任务 → 循环

### async1/async2 题为什么 2 在 5 后面？

`await` 后面的 `console.log('2')` 是微任务；`5` 是同步，同步先跑完再清微任务

## 复盘 · 2026-07-16

- 今天学了：事件循环进阶 8 题，async1/async2 经典题
- 搞懂的一个概念：await 后面是微任务；同步先于微任务
- 还不清楚的：无
- 明天优先：Day 18 · 第 4 周复盘自测
