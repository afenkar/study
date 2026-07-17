# 第 5 周 · Day 21：computed 与 watch

> Day 20 会了 ref / reactive；今天学**派生状态**和**副作用监听**——computed 算出来、watch 盯着变。

## 今日目标

- [x] 说清 computed、watch、普通 method 的区别与使用场景
- [x] 会用 `computed(() => ...)` 写派生数据
- [x] 会用 `watch(source, callback)` 做副作用（日志、请求、本地存储等）
- [x] 完成 `vue-lab/02-computed-watch/derived.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/02-computed-watch/index.html`（Live Server 打开）

---

## computed vs method vs watch（必背）

| | computed | method | watch |
|--|----------|--------|-------|
| 用途 | **派生状态**（由别的数据算出来） | 事件里调用的函数 | **副作用**（数据变了要干啥） |
| 缓存 | ✅ 依赖不变不重算 | ❌ 每次调用都执行 | — |
| 返回值 | 有（给模板用） | 有 | 无（callback 里写逻辑） |
| 典型场景 | 总价、全名、过滤列表 | 点击提交、格式化一次 | 搜素防抖、存 localStorage、调接口 |

### 一句话

> **能算出来的用 computed；数据变了要做事用 watch；点击才执行的用 method。**

---

## computed 最小示例

```javascript
import { ref, computed } from 'vue';

const price = ref(100);
const quantity = ref(2);

// 依赖 price、quantity；它们不变时，多次读 total 不会重算
const total = computed(() => price.value * quantity.value);

price.value = 200;  // total 自动变成 400
```

```html
<p>总价：{{ total }}</p>
```

**注意：** script 里读 computed 也要 `.value`（和 ref 一样）；template 里自动解包。

---

## watch 最小示例

```javascript
import { ref, watch } from 'vue';

const keyword = ref('');

watch(keyword, (newVal, oldVal) => {
  console.log('关键词变了', oldVal, '→', newVal);
  // 副作用：发请求、写日志、同步到 URL……
});
```

### 常见写法

```javascript
// 监听 ref
watch(count, (n) => { ... });

// 监听 reactive 的某个属性 — 用 getter
watch(() => user.name, (name) => { ... });

// 立即执行一次
watch(stock, cb, { immediate: true });
```

### watchEffect（了解）

```javascript
watchEffect(() => {
  // 函数里用到的响应式数据会自动被收集为依赖
  document.title = `库存：${stock.value}`;
});
```

今天重点掌握 **computed + watch**；`watchEffect` 知道有这回事即可。

---

## 和 Day 20 的关系

- `ref` / `reactive` 是**数据源**
- `computed` 在数据源之上**派生**新值（带缓存）
- `watch` 在数据源变化时**触发副作用**

```
ref/reactive → computed（算）→ 模板展示
            → watch（盯）  → 请求 / 存储 / 日志
```

---

## 今日 TODO（derived.js）

1. `createCartSummary()` — `price`、`quantity` 用 ref，`total` 用 computed 返回乘积
2. `createStockWatcher()` — `stock` 用 ref，`watch` 监听；库存 **< 10** 时往 `alerts` 推一条告警

---

## 易错点（今天踩过的坑）

### ❌ computed 不能包在 ref 里

```javascript
// 错：total.value 变成 ComputedRef 对象，不是数字
const total = ref(200);
total.value = computed(() => price.value * quantity.value);

// 对：total 本身就是 computed
const total = computed(() => price.value * quantity.value);
```

### watch 默认不是「立刻执行」

- 首次挂载**不会**自动跑 callback，除非加 `{ immediate: true }`
- 数据变化后 callback **异步**执行（下一个 tick），同步代码里改完马上读结果可能还是旧值

---

## 笔记区

### computed 和 method 最大区别是什么？（自己的话）

**用途 + 缓存。** computed 用来**派生**数据（如总价 = 单价 × 数量），依赖不变时会**缓存**，不会重复计算；method 每次调用都会重新执行，适合点击提交等**事件触发**的场景。

### watch 适合做什么，computed 不适合做什么？（自己的话）

watch 适合**副作用**：监听 ref / reactive / getter，数据变了去发请求、写日志、存 localStorage 等。computed 只负责**算出返回值**给模板用，不适合在里面 push 数组、调接口这类副作用逻辑。

## 复盘 · 2026-07-17

- 今天学了：computed 派生总价、watch 库存预警；createCartSummary / createStockWatcher
- 搞懂的一个概念：`total` 要直接 `computed(...)`，不能 `ref` 包一层；watch 管副作用，computed 管计算
- 还不清楚的：无
- 明天优先：Day 22 · 第 5 周复盘或组件入门（props / emit）
