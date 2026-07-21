# 第 7 周 · Day 28：动态路由与路由守卫

> Day 27 会了基础路由；今天学 **URL 带参数** 和 **跳转前拦截**——后台权限的基础。

## 今日目标

- [x] 会配置动态路由 `/user/:id`，读取 `route.params`
- [x] 会用 `beforeEach` 做全局前置守卫
- [x] 完成 `vue-lab/09-router-guards/` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`vue-lab/09-router-guards/index.html`（Live Server 打开）

---

## 动态路由（必背）

```javascript
{ path: '/user/:id', component: UserPage }
```

访问 `#/user/42` → `route.params.id === '42'`

```javascript
import { useRoute } from 'vue-router';

setup() {
  const route = useRoute();
  return { userId: route.params.id };
}
```

### 一句话

> **路径里用 `:参数名` 占位；组件里 `useRoute().params` 读取。**

---

## 路由守卫（必背）

```javascript
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && !isLoggedIn()) {
    next('/');      // 重定向
  } else {
    next();         // 放行
  }
});
```

| 钩子 | 时机 |
|------|------|
| `beforeEach` | 跳转**前**，最常用（权限、登录） |
| `afterEach` | 跳转**后**，改标题、埋点 |

### 一句话

> **beforeEach 里判断能不能去；不行就 `next('/login')` 重定向。**

---

## param vs query（补记）

| | 动态路由 param | query 查询参数 |
|--|----------------|----------------|
| URL 示例 | `/user/42` | `/user?id=42` |
| 定义方式 | path 里 `:id` | `?key=value` |
| 读取 | `route.params.id` | `route.query.id` |
| 场景 | RESTful 资源路径 | 筛选、搜索、可选参数 |

---

## 和 Day 27 的关系

| Day 27 | Day 28 |
|--------|--------|
| 固定 path | 动态 `:id` |
| 直接跳转 | 跳转前拦截 |
| router-view 展示 | 读 params + 权限控制 |

---

## 概念题

1. `/user/:id` 里的 `:id` → **param**
2. 读 `params` 用 → **useRoute**
3. 跳转前拦截 → **beforeEach**

---

## 笔记区

### 动态路由和 query（?id=1）区别？（自己的话）

param 写在路径里（`/user/42`），用 `params` 读；query 写在 `?` 后面（`?id=42`），用 `query` 读。param 更像资源 ID，query 更像筛选条件。

### beforeEach 里 next() 有哪些用法？（自己的话）

`next()` 放行；`next('/login')` 重定向；`next(false)` 取消导航（了解即可）。

## 复盘 · 2026-07-21

- 今天学了：`/user/:id` 动态路由、beforeEach 登录拦截
- 搞懂的一个概念：守卫在跳转前执行，未登录访问 /admin 被重定向首页
- 还不清楚的：param 和 query 的区别（已补笔记）
- 明天优先：Day 29 · 第 7 周 Router 复盘
