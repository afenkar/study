# 第 7 周 · Day 29：Router 复盘自测

> Day 27 基础路由、Day 28 动态路由与守卫——今天**闭卷自测**，把 Router 串起来。

## 今日目标

- ✅ 完成 `vue-lab/10-week7-review` 自测（10 题）
- ✅ 闭卷口述：router-view / router-link / params / beforeEach
- ✅ 错题回看 Day 27–28 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`vue-lab/10-week7-review/index.html`（Live Server 打开）

---

## 知识地图（Day 27–28）

| 天 | 主题 | 一句话 |
|----|------|--------|
| Day 27 | Router 入门 | routes + router-link + router-view |
| Day 28 | 动态路由与守卫 | `:id` 读 params；beforeEach 拦截 |

---

## Router 对照（必背）

| 概念 | 干什么 |
|------|--------|
| `routes` | path ↔ component 映射表 |
| `router-view` | 渲染当前路由组件 |
| `router-link` | 声明式跳转（不刷新整页） |
| `router.push()` | 编程式跳转 |
| `route.params` | 动态路由参数（`/user/:id`） |
| `route.query` | 查询参数（`?id=1`） |
| `beforeEach` | 跳转前守卫（权限/登录） |

### 一句话串讲

> **routes 配表 → link/push 跳转 → view 展示 → params 读 ID → beforeEach 拦权限。**

---

## 口述清单（15 分钟）

1. **router-link vs `<a href>`**：最大区别？

router-link 前端路由不刷新整页；`<a href>` 默认整页刷新。

2. **useRouter vs useRoute**：分别干什么？

useRouter → push/replace 跳转；useRoute → 读当前 path / params / query。

3. **param vs query**：URL 长什么样？怎么读？

param：`/user/42` → `route.params.id`；query：`?id=42` → `route.query.id`。

4. **易错点**：路由表组件字段叫什么？守卫里放行怎么写？

`component`（小写）；`next()` 放行，`next('/')` 重定向。

---

## 笔记区

### 今天最容易忘的一点

query 用 `route.query` 读，不是 params；路由表字段是 `component` 小写。

### 口述自检（过/不过）

- router-view / router-link：过 — view 展示当前组件，link 声明式跳转不刷新
- params / query：过 — params 在路径里，query 在 `?` 后用 `route.query` 读
- beforeEach：过 — 跳转前拦截，未登录 `next('/')`

## 复盘 · 2026-07-22

- 今天学了：第 7 周 Router 闭卷复盘，view/link/params/query/守卫串讲
- 搞懂的一个概念：Router 一条链：配表 → 跳转 → 展示 → 读参 → 拦截
- 还不清楚的：无
- 明天优先：Day 30 · Pinia 入门
