# 第 6 周 · Day 23：组件通信 · props 与 emit

> 第 5 周响应式四件套已过关。组件之间怎么传数据？**父 → 子用 props，子 → 父用 emit。**

## 今日目标

- [x] 说清 props / emit 的数据流向与使用场景
- [x] 会声明 props、在子组件 emit 事件
- [x] 完成 `vue-lab/04-props-emit/components.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/04-props-emit/index.html`（Live Server 打开）

---

## props vs emit（必背）

| | props | emit |
|--|-------|------|
| 方向 | **父 → 子** | **子 → 父** |
| 谁定义 | 子在 `props` 里声明 | 子在 `emits` 里声明 |
| 谁传/收 | 父 `:prop="值"` 传入 | 子 `emit('事件', 载荷)`；父 `@事件="handler"` |
| 原则 | **单向数据流** — 子不要直接改 props | 子通知父，由父改数据 |

### 一句话

> **父传 props 给子展示；子 emit 事件让父改数据。**

---

## 最小示例

### 父组件

```javascript
import { ref, defineComponent } from 'vue';
import ChildButton from './ChildButton.js';

const Parent = defineComponent({
  components: { ChildButton },
  setup() {
    const count = ref(0);
    function onAdd(step) {
      count.value += step;
    }
    return { count, onAdd };
  },
  template: `
    <p>总分：{{ count }}</p>
    <ChildButton :step="2" @add="onAdd" />
  `,
});
```

### 子组件

```javascript
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    step: { type: Number, default: 1 },
  },
  emits: ['add'],
  setup(props, { emit }) {
    function handleClick() {
      emit('add', props.step);
    }
    return { handleClick };
  },
  template: `<button @click="handleClick">+{{ step }}</button>`,
});
```

### template 里 emit 的简写

```html
<button @click="$emit('add', step)">加分</button>
```

---

## props 声明要点

```javascript
props: {
  count: { type: Number, required: true },
  title: { type: String, default: '默认标题' },
}
```

- 要声明 **type**，复杂组件建议 **required** 或 **default**
- script 里读 props：`props.count`（setup 参数）或 `defineProps`（`<script setup>` 时）

---

## 和 Day 20–22 的关系

| 层级 | API | 作用 |
|------|-----|------|
| 组件内部 | ref / reactive / computed / watch | 管自己的状态 |
| 组件之间 | props / emit | 父子传值、事件上报 |

---

## 今日 TODO（components.js）

1. `CounterDisplay`
2. `CounterPanel`

要求见笔记上文，代码文件里不再重复提示。

---

## 概念题

1. props 数据方向？→ **down**
2. 子组件能直接改 props 吗？→ **no**
3. 子通知父用？→ **emit**

---

## 写码不熟？背两个模板

**能讲清楚但写不出**，通常是缺「固定句式」。子组件就两种：

### 模板 A：只展示（CounterDisplay）

```javascript
defineComponent({
  props: { count: { type: Number, required: true } },
  template: `<p>分数：{{ count }}</p>`,
});
```

口诀：**声明 props → 模板里用 `{{ 名 }}`**

### 模板 B：要通知父（CounterPanel）

```javascript
defineComponent({
  props: { step: { type: Number, default: 1 } },
  emits: ['add'],
  setup(props, { emit }) {
    function handleClick() {
      emit('add', props.step);  // 事件名 + 传给父的数据
    }
    return { handleClick };
  },
  template: `<button @click="handleClick">+{{ step }}</button>`,
});
```

口诀：**props + emits + setup 里 emit + return 函数**

### 父组件连线（对照 ScoreBoard 看）

```html
<CounterDisplay :count="score" />      <!-- : 传 props -->
<CounterPanel :step="2" @add="onAdd" /> <!-- @ 听 emit -->
```

---

## 笔记区

### props 和 emit 各管哪个方向？（自己的话）

props 父传子，传值给子展示；emit 子传父，子通知父去改数据。

### 为什么子组件不应该直接改 props？（自己的话）

子只负责展示，props 是父的数据；子直接改会破坏单向数据流，父和子状态会对不上。

## 复盘 · 2026-07-18

- 今天学了：CounterDisplay / CounterPanel，props 父传子、emit 子传父
- 搞懂的一个概念：子只展示不改 props，改数据由父负责
- 还不清楚的：概念会、手写还不熟——正常，多按上面两个模板写几遍
- 明天优先：Day 24 · 插槽或 v-model 入门
