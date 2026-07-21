# 第 7 周 · Day 27：Vue Router 入门

> 第 6 周组件通信已过关。单页应用（SPA）如何在**不刷新页面**的情况下切换页面？靠 **Vue Router**。

## 今日目标

- [x] 说清 SPA、路由、组件三者的关系
- [x] 会配置 routes、`router-link`、`router-view`
- [x] 完成 `vue-lab/08-router-basics/router.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/08-router-basics/index.html`（Live Server 打开）

---

## 核心概念（必背）

| 概念 | 干什么 |
|------|--------|
| **路由 route** | URL 路径 ↔ 要显示的组件 |
| **router-view** | 当前路由匹配到的组件渲染在这里 |
| **router-link** | 声明式导航，点击切换路由（不刷新页） |
| **useRouter()** | 编程式导航，如 `router.push('/about')` |
| **useRoute()** | 读当前路由信息，如 `route.path` |

### 一句话

> **路由表决定 URL 显示哪个组件；router-link / push 负责跳转；router-view 负责展示。**

---

## 最小配置

```javascript
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// main.js
const app = createApp(AppShell);
app.use(router);
app.mount('#app');
```

```html
<!-- AppShell 模板 -->
<nav>
  <router-link to="/">首页</router-link>
  <router-link to="/about">关于</router-link>
</nav>
<router-view />
```

**为什么用 Hash 模式？** Live Server 直接打开 HTML 时，History 模式需要服务端配合；Hash（`#/about`）本地实验最省事。

---

## 声明式 vs 编程式导航

| | 写法 | 场景 |
|--|------|------|
| 声明式 | `<router-link to="/about">` | 菜单、Tab |
| 编程式 | `router.push('/about')` | 表单提交后跳转、权限拦截后跳转 |

---

## 和前面章节的关系

| 章节 | 管什么 |
|------|--------|
| Day 20–22 | 组件**内部**状态 |
| Day 23–26 | **父子**之间通信 |
| Day 27+ | **页面级**切换（多组件组成 SPA） |

---

## 易错点

### ❌ `Component` vs `component`

```javascript
// 错 — Vue Router 不认大写，页面空白
{ path: '/', Component: HomePage }

// 对 — 必须小写 component
{ path: '/', component: HomePage }
```

---

## 概念题

1. 当前路由组件渲染在哪？→ **router-view**
2. 菜单不刷新跳转？→ **router-link**
3. 代码里主动跳转？→ **router.push**（`useRouter().push`）

---

## 笔记区

### SPA 为什么不刷新页面也能换内容？（自己的话）

只加载一次 HTML，之后由 JS 根据 URL 切换 `router-view` 里的组件，不重新请求整页。

### router-link 和 `<a href>` 最大区别？（自己的话）

`router-link` 走前端路由，**不刷新整页**；`<a href>` 默认**整页刷新**（传统多页行为）。

## 复盘 · 2026-07-21

- 今天学了：createRoutes / createAppRouter，router-link + router-view
- 搞懂的一个概念：路由表绑定 path 和 component，Hash 模式本地实验
- 还不清楚的：component 大小写曾写错成 Component（React 习惯）
- 明天优先：Day 28 · 动态路由或路由守卫
