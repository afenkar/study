# 第 9 周 · Day 33：composable 复盘自测

> Day 32 composable 入门——今天**闭卷自测**，把 composable 与 Pinia / ref 的分工串起来。

## 今日目标

- ✅ 完成 `vue-lab/14-week9-review` 自测（10 题）
- ✅ 闭卷口述：composable vs Pinia vs 组件 ref
- ✅ 错题回看 Day 32 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/14-week9-review/index.html`（Live Server 打开）

---

## 知识地图（Day 32 + 对比）

| 概念 | 一句话 |
|------|--------|
| composable | `useXxx()` 抽逻辑复用 |
| Pinia | 全局 store 共享状态 |
| 组件 ref | 当前组件局部 state |

### 一句话串讲

> **ref 管局部，composable 抽复用逻辑，Pinia 管全局共享。**

---

## 口述清单（15 分钟）

1. **composable 命名 + 返回值？**

`use` 开头；return ref + 方法。

2. **composable vs Pinia？**

composable 复用逻辑（每组件可有独立 state）；Pinia 全局同一份数据。

3. **什么适合 composable？**

计数、toggle、useFetch、表单校验等多组件共用逻辑。

4. **composable 里 ref 怎么访问？**

script 里 `.value`；return 给 template 自动解包。

---

## 笔记区

### 今天最容易忘的一点

composable 复用**逻辑**，Pinia 共享**同一份数据**——不是一回事。

### 口述自检（过/不过）

- composable vs Pinia：过 — 逻辑复用 vs 全局同一份 state
- composable vs ref：过 — composable 把 ref+方法抽出来跨组件复用；ref 只在当前组件
- use 命名：过 — 必须 `use` 开头

## 复盘 · 2026-07-22

- 今天学了：第 9 周 composable 闭卷复盘 10/10
- 搞懂的一个概念：ref / composable / Pinia 三层分工能讲清楚
- 还不清楚的：无
- 明天优先：Day 34 · 性能优化入门
