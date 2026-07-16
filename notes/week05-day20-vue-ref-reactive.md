# 第 5 周 · Day 20：Vue 3 响应式入门 · ref 与 reactive

> 第 1 阶段 JS 地基已过关。Vue 3 核心就是**响应式**——数据变了，视图自动更新。今天先搞懂 `ref` 和 `reactive`。

## 今日目标

- [ ] 说清 ref 和 reactive 的使用场景
- [ ] 知道 script 里 ref 要 `.value`，template 里自动解包
- [ ] 完成 `vue-lab/01-ref-reactive/reactivity.js` 中 2 个 TODO
- [ ] 通过练习验证
- [ ] 填写本笔记底部复盘

## 实验位置

`vue-lab/01-ref-reactive/index.html`（Live Server 打开）

---

## ref vs reactive（必背）

| | ref | reactive |
|--|-----|----------|
| 适合 | **基本类型**（number/string/boolean） | **对象 / 数组** |
| script 访问 | 要 `.value` | 直接 `.prop` |
| template | 自动解包，不用 `.value` | 直接用 |
| 整体替换 | `count.value = 1` | 不能整体替换（会丢响应式） |

### 一句话

> **基本类型用 ref；对象用 reactive；script 里 ref 记得 .value。**

---

## 最小示例

```javascript
import { ref, reactive } from 'vue';

// ref — 计数器
const count = ref(0);
count.value += 1;           // script 要 .value

// reactive — 表单对象
const user = reactive({ name: '张三', age: 18 });
user.name = '李四';          // 直接改属性
```

```html
<!-- template 里 ref 自动解包 -->
<p>{{ count }}</p>
<button @click="count++">+1</button>
```

---

## 和 JS 闭包的关系（面试加分）

Vue 3 响应式底层是 **Proxy**（Day 11 学过对象引用）。

- `ref` 包一层对象 `{ value: xxx }`，用 `.value` 触发依赖收集
- `reactive` 直接 Proxy 整个对象

今天先会用，原理 Day 21+ 再深入。

---

## 今日 TODO（reactivity.js）

1. `createCounter()` — 用 `ref(0)`，返回 `{ count, increment }`
2. `createUserForm()` — 用 `reactive({ name, email })`，返回 `{ user, setName }`

---

## 笔记区

### ref / reactive 怎么选（自己的话）

（填写）

### template 里 ref 要不要 .value？script 里呢？

（填写）

## 复盘 · YYYY-MM-DD

- 今天学了：
- 搞懂的一个概念：
- 还不清楚的：
- 明天优先：
