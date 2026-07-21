# 第 6 周 · Day 24：插槽 slot 入门

> Day 23 用 props / emit 传**数据**；今天学**传模板**——父组件往子组件里「挖的空位」塞内容。

## 今日目标

- [x] 说清 props 和 slot 的区别
- [x] 会在子组件模板里写 `<slot>`，父组件传默认插槽内容
- [x] 完成 `vue-lab/05-slots/components.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

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

1. 插槽内容由谁提供？→ **parent**
2. 传一整块 UI → **slot**
3. `<slot>` 写在哪个组件？→ **child**

---

## 笔记区

### props 和 slot 分别适合传什么？（自己的话）

都是父传子：props 传**数据**（title、count）；slot 传**整块 UI**（段落、按钮、嵌套组件）。

### 父组件怎么给子组件传插槽内容？（自己的话）

子在 template 里写 `<slot>` 留坑；父在子组件**开闭标签之间**写 HTML，内容会渲染到 `<slot>` 位置。`:title` 仍是 props，和插槽是两套机制。

## 复盘 · 2026-07-20

- 今天学了：BaseCard / PageShell 默认插槽，props 传值 + slot 传 UI
- 搞懂的一个概念：子挖坑 `<slot>`，父在标签之间填内容
- 还不清楚的：无
- 明天优先：Day 25 · v-model 本质
