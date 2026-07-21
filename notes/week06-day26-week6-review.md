# 第 6 周 · Day 26：组件通信复盘自测

> Day 23 props/emit、Day 24 slot、Day 25 v-model——今天**闭卷自测**，把组件通信串起来。

## 今日目标

- [x] 完成 `vue-lab/07-week6-review` 自测（10 题）
- [x] 闭卷口述：props / emit / slot / v-model 各一句
- [x] 错题回看 Day 23–25 笔记
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/07-week6-review/index.html`（Live Server 打开）

---

## 知识地图（Day 23–25）

| 天 | 主题 | 一句话 |
|----|------|--------|
| Day 23 | props / emit | 父传 props 展示；子 emit 通知父改数据 |
| Day 24 | slot | 父在子标签之间传整块 UI |
| Day 25 | v-model | modelValue + update:modelValue 语法糖 |

---

## 通信方式对照（必背）

| 方式 | 方向 | 传什么 |
|------|------|--------|
| props | 父 → 子 | 数据 |
| emit | 子 → 父 | 事件 |
| slot | 父 → 子 | 模板 / UI |
| v-model | 双向绑定 | props + emit 简写 |

### 一句话串讲

> **props 传值、emit 上报、slot 传 UI、v-model 是 props+emit 的糖。**

---

## 口述清单（15 分钟）

1. **props vs emit**：方向 + 谁声明谁使用？

props 父→子，子声明；emit 子→父，子 emit、父 @监听。

2. **props vs slot**：分别适合传什么？

props 传数据；slot 传 HTML / 组件结构。

3. **v-model 拆开是什么？**

`:modelValue` + `@update:modelValue`。

4. **易错点**：子能直接改 props 吗？v-model 在 Vue 3 默认 prop 叫什么？

不能；`modelValue`。

---

## 笔记区

### 今天最容易忘的一点

v-model 默认 prop 是 `modelValue`，不是 Vue 2 的 `value`。

### 口述自检（过/不过）

- props / emit：过 — 父传子数据，子 emit 通知父改
- slot：过 — 父在子标签之间传 UI / 模板
- v-model：过 — props+emit 语法糖，`:modelValue` + `@update:modelValue`

## 复盘 · 2026-07-21

- 今天学了：第 6 周闭卷复盘，props / emit / slot / v-model 串讲
- 搞懂的一个概念：四种通信方式各管什么，能一张表讲清楚
- 还不清楚的：无
- 明天优先：Day 27 · Vue Router 入门
