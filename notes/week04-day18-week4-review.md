# 第 4 周 · Day 18：第 4 周复盘自测

> Day 8 Promise、Day 15 all/race、Day 16 串行、Day 17 事件循环——今天**闭卷自测**，为第 1 阶段 JS 地基收尾。

## 今日目标

- [x] 完成 `js-lab/18-week4-review` 自测（10 题）
- [x] 闭卷口述：all/race、串行/并行、事件循环 各一句
- [x] 错题回看 Day 8 / 15 / 16 / 17 笔记
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/18-week4-review/index.html`（Live Server 打开）

---

## 知识地图（Day 8 + 15–17）

| 天 | 主题 | 一句话 |
|----|------|--------|
| Day 8 | 手写 Promise | pending/fulfilled/rejected；then 返回新 Promise |
| Day 15 | all / race | all 全到齐；race 谁先到用谁 |
| Day 16 | 串行执行 | for + await 串行；Promise.all 并行 |
| Day 17 | 事件循环 | 同步 → 微任务 → 宏任务；await 后是微任务 |

---

## 口述清单（15 分钟）

1. **Promise.all vs race**：区别 + 场景

all：全部 resolve 才 resolve，任一 reject 立刻 reject → 并行多接口都要齐
race：谁先 settled 用谁 → 超时控制、取最快

2. **串行 vs 并行**：工具 + 耗时

串行：for + await，耗时 ≈ 各任务相加
并行：Promise.all，耗时 ≈ 最慢那个

3. **事件循环**：一句话 + async1/async2 顺序

同步 → 清空微任务 → 下一个宏任务；async1/async2：`4,1,3,5,2`

4. **myAll 失败为何卡住**：reject 要放 then 第 2 个参数

reject 写在 then 外面不会注册失败回调，Promise 一直 pending

---

## 笔记区

### 今天最容易忘的一点

myAll 的 reject 必须作为 `.then(success, reject)` 的第 2 个参数

### 口述自检（过/不过）

- all / race：过
- 串行 / 并行：过
- 事件循环：过

## 复盘 · 2026-07-16

- 今天学了：第 4 周闭卷复盘 10/10
- 搞懂的一个概念：all/race、串行/并行、事件循环能串起来讲
- 还不清楚的：无
- 明天优先：Day 19 · 第 1 阶段总复盘
