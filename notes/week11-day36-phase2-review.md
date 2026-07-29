# 第 11 周 · Day 36：第 2 阶段总复盘

> Day 20–35 覆盖了响应式、组件、Router、Pinia、composable、性能……今天**第 2 阶段闭卷总测**，过关进工程化。

## 今日目标

- ✅ 完成 `vue-lab/17-phase2-review` 自测（12 题）
- ✅ 15 分钟口述 8 个核心概念（见下方清单）
- ✅ 错题标记 → 回对应 Day 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/17-phase2-review/index.html`（Live Server 打开）

**得分 12/12** — 第 2 阶段 Vue 深度过关 🎉

---

## 第 2 阶段知识地图（6 周）

| 周 | 核心 | 代表 Day |
|----|------|----------|
| 第 5 周 | ref / reactive / computed / watch | 20–22 |
| 第 6 周 | props、emit、slot、v-model | 23–26 |
| 第 7 周 | Router、动态路由、守卫 | 27–29 |
| 第 8 周 | Pinia 状态管理 | 30–31 |
| 第 9 周 | composable 组合式逻辑 | 32–33 |
| 第 10 周 | 性能优化、DevTools | 34–35 |

---

## 口述 8 句（闭卷，各 1 句）

1. **ref / reactive**：基本类型 ref + `.value`；对象 reactive；script 里 ref 要 `.value`
2. **computed / watch**：computed 派生缓存；watch 监听做副作用
3. **props / emit**：父 → 子 props；子 → 父 emit
4. **v-model**：`:modelValue` + `@update:modelValue` 语法糖
5. **Router**：`beforeEach` 鉴权；动态路由 `route.params`
6. **Pinia**：state 存 → actions 改 → getters 算 → `useXxxStore()` 用
7. **composable vs Pinia**：抽逻辑复用 vs 全局同一份 state
8. **性能**：频繁显隐 v-show；Tab 留状态 keep-alive；先 DevTools 测量

---

## 错题回看索引

| 题涉及 | 回看 |
|--------|------|
| ref / computed / watch | Day 20–22 |
| props / emit / v-model | Day 23–26 |
| Router / 守卫 | Day 27–29 |
| Pinia | Day 30–31 |
| composable | Day 32–33 |
| 性能 / DevTools | Day 34–35 |

---

## 笔记区

### 最薄弱的一个点（诚实写）

keep-alive 印象不深 — **Day 34** 学过（Tab 切换缓存组件实例）；Day 35 Q5、Day 36 Q12 都考过，保持复习即可。

### 口述 8 句自检（过/不过）

- ref / reactive：**过** — 基本类型 ref + `.value`；对象 reactive
- computed / watch：**过** — computed 派生；watch 副作用
- props / emit / v-model：**过** — 父→子 props；子→父 emit；v-model 是语法糖
- Router：**过** — `beforeEach` 鉴权；懒加载 `() => import()`
- Pinia：**过** — state 存、actions 改、getters 派生
- composable vs Pinia：**过** — 逻辑复用 vs 全局共享
- 性能三件套：**过** — v-if/v-show、key、keep-alive / 懒加载
- DevTools 习惯：**过** — 先看值 → 再看触发 → 再优化

## 复盘 · 2026-07-23

- 今天学了：第 2 阶段总复盘 12/12，口述 8 句自检
- 第 2 阶段最大收获：Vue 3 响应式 → 组件 → Router → Pinia → composable → 性能，能闭卷串讲
- 还不清楚的：keep-alive 需偶尔复习（Day 34）
- 明天优先：Day 37 · 第 3 阶段启动（Vite / 工程化）
