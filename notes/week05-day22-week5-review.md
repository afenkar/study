# 第 5 周 · Day 22：响应式复盘自测

> Day 20 ref/reactive、Day 21 computed/watch——今天**闭卷自测**，把 Vue 3 响应式四件套串起来。

## 今日目标

- [x] 完成 `vue-lab/03-week5-review` 自测（10 题）
- [x] 闭卷口述：ref/reactive、computed/watch 各一句
- [x] 错题回看 Day 20 / 21 笔记
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/03-week5-review/index.html`（Live Server 打开）

---

## 知识地图（Day 20–21）

| 天 | 主题 | 一句话 |
|----|------|--------|
| Day 20 | ref / reactive | 基本类型 ref + .value；对象 reactive 直接改属性 |
| Day 21 | computed / watch | 能算用 computed（有缓存）；副作用用 watch |

---

## 四件套对照（必背）

| API | 干什么 | 典型场景 |
|-----|--------|----------|
| ref | 包基本类型，script 要 `.value` | count、loading、keyword |
| reactive | Proxy 对象，直接改属性 | 表单对象、列表 state |
| computed | 派生值，依赖不变则缓存 | 总价、全名、过滤结果 |
| watch | 数据变了做副作用 | 搜素请求、告警、存 localStorage |

### 一句话串讲

> **ref/reactive 存数据 → computed 算展示 → watch 盯变化做副作用。**

---

## 口述清单（15 分钟）

1. **ref vs reactive**：什么类型用什么？script / template 怎么访问？

基本类型 ref；对象 reactive。script 里 ref 要 `.value`，template 自动解包。

2. **computed vs watch**：区别 + 各举一个场景

computed 派生 + 缓存，如总价；watch 副作用，如库存告警、发请求。

3. **易错点**：computed 能 `ref` 包一层吗？watch 默认立刻执行吗？

不能；watch 默认异步、挂载不立刻跑（除非 `immediate: true`）。

4. **reactive 陷阱**：能 `user = {}` 整体替换吗？

不能，会丢响应式；改属性或 `Object.assign` 才安全。

---

## 笔记区

### 今天最容易忘的一点

watch 默认挂载不立刻执行；computed 要直接 `computed(...)`，不能 `ref` 包一层

### 口述自检（过/不过）

- ref / reactive：过
- computed / watch：过
- 易错点：过

## 复盘 · 2026-07-18

- 今天学了：第 5 周闭卷复盘 10/10，响应式四件套串讲
- 搞懂的一个概念：ref/reactive 存数据 → computed 算 → watch 副作用，一条链讲清楚
- 还不清楚的：无
- 明天优先：Day 23 · 组件入门 props / emit
