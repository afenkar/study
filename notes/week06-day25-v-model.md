# 第 6 周 · Day 25：v-model 本质

> Day 23 props/emit、Day 24 slot。`v-model` 不是新魔法，是 **props + emit 的语法糖**。

## 今日目标

- [x] 说清 v-model 在自定义组件上的本质
- [x] 能实现 `modelValue` + `update:modelValue`
- [x] 完成 `vue-lab/06-v-model/components.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/06-v-model/index.html`（Live Server 打开）

---

## v-model 是什么（必背）

父组件写：

```html
<TextField v-model="keyword" />
```

**等价于：**

```html
<TextField
  :modelValue="keyword"
  @update:modelValue="keyword = $event"
/>
```

### Vue 3 约定

| 角色 | 做什么 |
|------|--------|
| 子组件 props | 接收 `modelValue` |
| 子组件 emit | `emit('update:modelValue', 新值)` |
| 父组件 | `v-model` 自动完成绑定 |

### 一句话

> **v-model = 子收 modelValue，子 emit update:modelValue，父自动同步。**

---

## 子组件最小实现

```javascript
defineComponent({
  props: { modelValue: String },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function onInput(e) {
      emit('update:modelValue', e.target.value);
    }
    return { onInput };
  },
  template: `
    <input :value="modelValue" @input="onInput" />
  `,
});
```

**注意：** 不要 `v-model` 绑在 props 上；用 `:value` + `@input` 手动 emit。

---

## 多个 v-model（了解）

```html
<UserForm v-model:name="name" v-model:age="age" />
```

对应 props `name` / `age`，emit `update:name` / `update:age`。

---

## 和 Day 23–24 的关系

| 机制 | 作用 |
|------|------|
| props | 父 → 子传 `modelValue` |
| emit | 子 → 父 `update:modelValue` |
| v-model | 上面两行的简写 |
| slot | 传 UI 结构（与 v-model 互补） |

---

## 今日 TODO（components.js）

1. `TextField` — 支持 `v-model` 绑定字符串
2. `ToggleSwitch` — 支持 `v-model` 绑定布尔值（点击切换开/关）

`FormDemo` 已写好，补全两个子组件即可。

---

## 概念题

1. Vue 3 自定义组件 v-model 默认 prop 名？→ **modelValue**
2. 子组件通知父更新用什么事件？→ **update:modelValue**
3. v-model 本质是？→ **props+emit**

---

## 笔记区

### v-model 拆开是什么？（自己的话）

v-model 是 props + emit 的语法糖：父传 `modelValue`，子 `emit('update:modelValue', 新值)`。

### 为什么子组件不能直接改 props.modelValue？（自己的话）

props 是父的数据，子直接改会破坏单向数据流；应 emit 通知父去改。

## 复盘 · 2026-07-21

- 今天学了：TextField / ToggleSwitch 实现 v-model；modelValue + update:modelValue
- 搞懂的一个概念：v-model 不是新 API，就是 Day 23 的 props/emit 简写
- 还不清楚的：无
- 明天优先：Day 26 · 第 6 周复盘
