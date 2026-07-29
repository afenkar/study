# 第 9 周 · Day 32：composable 入门

> Pinia 管**全局**状态；**可复用的逻辑**（计数、开关、请求封装）抽成 **composable**——组合式 API 的精髓。

## 今日目标

- ✅ 说清 composable 是什么、何时用
- ✅ 会写 `useXxx()` 函数，返回 ref + 方法
- ✅ 完成 `vue-lab/13-composables/composables.js` 中 2 个 TODO
- ✅ 通过练习验证
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/13-composables/index.html`（Live Server 打开）

---

## composable 是什么（必背）

**Composable = 以 `use` 开头的函数，把响应式逻辑打包复用。**

```javascript
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  function increment() {
    count.value += 1;
  }
  return { count, increment };
}
```

```javascript
// 组件 setup
const { count, increment } = useCounter();
```

### 一句话

> **composable = 抽逻辑的可复用函数；里面用 ref/computed/watch，外面直接用。**

---

## composable vs Pinia vs 组件内 ref

| | 组件内 ref | composable | Pinia |
|--|------------|------------|-------|
| 范围 | 当前组件 | 多组件复用逻辑 | 全局共享状态 |
| 场景 | 局部 UI | 计数器、toggle、useFetch | 用户、购物车 |
| 命名 | 随意 | **必须 use 开头** | useXxxStore |

---

## 概念题

1. 命名惯例 → **use** 开头
2. 主要解决 → **reuse-logic**（复用逻辑）
3. 能用 ref 吗 → **yes**

---

## 笔记区

### composable 和 Pinia 最大区别？（自己的话）

composable 把**逻辑**抽到 `useXxx()` 复用，每个组件调用有独立 state；Pinia 是**全局共享**同一份数据。

### 什么逻辑适合抽 composable？（自己的话）

多个组件都要用的逻辑：计数器、开关 toggle、表单校验、请求封装（useFetch）等。

## 复盘 · 2026-07-22

- 今天学了：useCounter / useToggle，use 前缀 + return ref 和方法
- 搞懂的一个概念：composable 复用逻辑，Pinia 管全局状态，分工不同
- 还不清楚的：无
- 明天优先：Day 33 · 第 9 周 composable 复盘
