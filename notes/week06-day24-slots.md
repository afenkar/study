# 第 6 周 · Day 24：插槽 slot 入门

> Day 23 用 props / emit 传**数据**；今天学**传模板**——父组件往子组件里「挖的空位」塞内容。

## 今日目标

- [ ] 说清 props 和 slot 的区别
- [ ] 会在子组件模板里写 `<slot>`，父组件传默认插槽内容
- [ ] 完成 `vue-lab/05-slots/components.js` 中 2 个 TODO
- [ ] 通过练习验证
- [ ] 填写本笔记底部复盘

## 实验位置

`vue-lab/05-slots/index.html`（Live Server 打开）

---

## props vs slot（必背）

| | props | slot（插槽） |
|--|-------|-------------|
| 传什么 | **数据**（字符串、数字、对象） | **模板 / DOM 结构**（HTML、组件） |
| 谁定义坑位 | 子声明 `props` | 子模板里写 `<slot>` |
| 谁填内容 | 父 `:prop="值"` | 父在子标签**之间**写内容 |
| 典型场景 | title、count、disabled | 卡片正文、列表项、弹窗 body |

### 一句话

> **props 传值；slot 传整块 UI。**

---

## 默认插槽

### 子组件（挖坑）

```javascript
defineComponent({
  props: { title: String },
  template: `
    <div class="card">
      <h3>{{ title }}</h3>
      <slot></slot>
    </div>
  `,
});
```

### 父组件（填坑）

```html
<BaseCard title="个人资料">
  <p>张三 · 前端工程师</p>
</BaseCard>
```

`<p>...</p>` 会渲染到子组件 `<slot>` 的位置。

---

## 后备内容（了解）

子组件没收到插槽内容时，可显示默认 UI：

```html
<slot>暂无内容</slot>
```

---

## 和 Day 23 的关系

| 通信方式 | 方向 | 传什么 |
|----------|------|--------|
| props | 父 → 子 | 数据 |
| emit | 子 → 父 | 事件 |
| slot | 父 → 子 | 模板片段 |

---

## 今日 TODO（components.js）

1. `BaseCard` — 在 `.card-body` 区域加入默认插槽
2. `PageShell` — 在 `.content` 区域加入默认插槽

`DemoApp` 已写好，补全两个子组件即可在页面看到效果。

---

## 概念题

1. 插槽内容由谁提供？`parent` / `child`
2. 传一整块按钮+文字 UI，用 props 还是 slot？`props` / `slot`
3. `<slot>` 标签写在哪个组件模板里？`parent` / `child`

（答案填 `exercise.js` 的 `conceptAnswers`）

---

## 写码模板

### 子组件：留坑

```javascript
template: `
  <div class="wrapper">
    <slot></slot>
  </div>
`,
```

### 父组件：填坑

```html
<MyWrapper>
  <p>任意 HTML / 组件写在这里</p>
</MyWrapper>
```

---

## 笔记区

### props 和 slot 分别适合传什么？（自己的话）



### 父组件怎么给子组件传插槽内容？（自己的话）



## 复盘 · 2026-07-19

- 今天学了：
- 搞懂的一个概念：
- 还不清楚的：
- 明天优先：Day 25 · v-model 本质
