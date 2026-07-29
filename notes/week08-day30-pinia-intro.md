# 第 8 周 · Day 30：Pinia 入门

> 组件 state 只能自己用；**多个页面 / 组件要共享数据**，用 **Pinia** 集中管理。

## 今日目标

- ✅ 说清 Pinia 解决什么问题
- ✅ 会用 `defineStore` 定义 state + actions
- ✅ 完成 `vue-lab/11-pinia-basics/stores.js` 中 2 个 TODO
- ✅ 通过练习验证
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/11-pinia-basics/index.html`（Live Server 打开）

---

## Pinia 是什么（必背）

| 概念 | 干什么 |
|------|--------|
| **store** | 一块全局状态（像小型数据中心） |
| **state** | 存数据 |
| **getters** | 派生数据（类似 computed） |
| **actions** | 改 state 的方法（可同步 / 异步） |

### 一句话

> **Pinia = 全局 store；state 存数据，actions 改数据，组件里 `useXxxStore()` 取用。**

---

## 最小示例

```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count += 1;
    },
  },
});
```

```javascript
// main.js
import { createPinia } from 'pinia';
app.use(createPinia());
```

```javascript
// 组件 setup
import { useCounterStore } from './stores.js';

const counter = useCounterStore();
counter.increment();
// counter.count 响应式
```

---

## 何时用 Pinia vs 组件 state

| | 组件 state | Pinia |
|--|------------|-------|
| 范围 | 当前组件 | 跨组件 / 跨页面 |
| 场景 | 表单输入、局部 UI | 用户信息、购物车、权限 |

---

## 和前面章节的关系

| 章节 | 管什么 |
|------|--------|
| Day 20–22 | 单组件内部响应式 |
| Day 23–26 | 父子通信 |
| Day 27–29 | 页面切换 |
| Day 30+ | **全局**状态共享 |

---

## 概念题

1. 定义 store 用？→ **defineStore**
2. 组件里使用 store？→ **useXxxStore**
3. 跨页面共享登录用户？→ **pinia**

---

## 笔记区

### Pinia 和组件 ref 最大区别？（自己的话）

Pinia 是**全局**状态，多个组件 / 页面共享；组件 `ref` 只在**当前组件**内有效。

### actions 里为什么用 `this.count`？（自己的话）

不是闭包。Options 式 store 里，`actions` 的 `this` 指向 **store 实例本身**，所以能直接读写 `this.count`、`this.name`。

## 复盘 · 2026-07-22

- 今天学了：defineStore、state、actions；useCounterStore / useUserStore
- 搞懂的一个概念：Pinia 管跨页面共享，actions 里 this 是 store
- 还不清楚的：无
- 明天优先：Day 31 · 第 8 周 Pinia 复盘
