# 第 8 周 · Day 31：Pinia 复盘自测

> Day 30 Pinia 入门——今天**闭卷自测**，把状态管理串起来。

## 今日目标

- ✅ 完成 `vue-lab/12-week8-review` 自测（10 题）
- ✅ 闭卷口述：Pinia vs 组件 state、state / actions / getters
- ✅ 错题回看 Day 30 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/12-week8-review/index.html`（Live Server 打开）

---

## 知识地图（Day 30）

| 概念 | 一句话 |
|------|--------|
| defineStore | 定义一块 store |
| state | 存数据 |
| actions | 改数据（`this` 是 store） |
| getters | 派生数据（类似 computed） |
| useXxxStore() | 组件里取用 store |

### 一句话串讲

> **defineStore 定义 → state 存 → actions 改 → useXxxStore 用；跨页面共享上 Pinia。**

---

## 口述清单（15 分钟）

1. **Pinia vs 组件 ref**：什么场景用什么？

ref 组件内局部；Pinia 跨组件 / 跨页面（用户、购物车、权限）。

2. **state / actions / getters**：各干什么？

state 存；actions 改；getters 算派生值。

3. **actions 里 this 是什么？**

store 实例，不是闭包。

4. **何时不用 Pinia？**

只在单个组件里用的临时 UI 状态，用 ref 就够。

---

## 笔记区

### 今天最容易忘的一点

actions 里 `this` 是 store 实例，不是闭包。

### 口述自检（过/不过）

- Pinia vs ref：过 — Pinia 跨组件共享，ref 组件内局部
- state / actions：过 — state 存，actions 改
- this 指向：过 — store 实例

## 复盘 · 2026-07-22

- 今天学了：第 8 周 Pinia 闭卷复盘 10/10
- 搞懂的一个概念：Pinia 管全局共享，ref 管局部；state / actions / getters 分工
- 还不清楚的：无
- 明天优先：Day 32 · composable 入门
