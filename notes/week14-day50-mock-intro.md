# 第 14 周 · Day 50：Mock 数据入门

> Day 49 ESLint 已过关。后端接口还没好，前端不能干等——用 **Mock 数据** 先把页面和逻辑跑起来。

## 今日目标

- ✅ 说清 Mock 是什么、什么时候用
- ✅ 知道常见 Mock 方式（静态 JSON、devServer、MSW）
- ✅ 理解 Mock 数据结构要和真实 API 对齐
- ✅ 完成 `mock-lab/01-mock-basics` 实验 A + 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

| 实验 | 路径 |
|------|------|
| 动手（拉 Mock 数据） | `mock-lab/01-mock-basics/demo.html`（Live Server） |
| 概念自测 | `mock-lab/01-mock-basics/quiz/index.html`（Live Server，勿看 `check.js`） |

**得分 10/10** ✅

---

## Mock 是什么（必背）

**Mock** = 用**假数据 / 假接口**模拟后端响应，让前端能独立开发、调试、演示。

```
真实流程：  前端 ──HTTP──▶ 后端 API ──▶ 数据库
Mock 流程：  前端 ──HTTP──▶ Mock 层（假数据）   ← 后端还没好也能做
```

### 一句话

> **Mock = 在后端没准备好时，给前端一个「长得像真接口」的数据源。**

---

## 常见 Mock 方式（必背）

| 方式 | 干什么 | 典型场景 |
|------|--------|----------|
| **静态 JSON 文件** | `fetch('/data/users.json')` | 入门、列表页 demo |
| **Vite devServer 中间件** | dev 时拦截 `/api/*` 返回假数据 | Vue / Vite 项目常用 |
| **json-server** | 把 JSON 当 REST API 跑起来 | 快速 CRUD mock |
| **MSW** | 在浏览器 / Node 里拦截网络请求 | 测试 + 开发，较专业 |

---

## Mock 设计原则（实战）

1. **对齐接口文档** — 字段名、嵌套、`code` / `data` / `message` 和真接口一致
2. **覆盖边界** — 空数组、401 等边界场景
3. **可切换** — env 从 mock 切到 real
4. **Mock 不代替联调** — 上线前必须和真后端走一遍

---

## 场景自测（10 题 · 闭卷）

在 `mock-lab/01-mock-basics/quiz/index.html` 选题验证。**得分 10/10** ✅

---

## 笔记区

### Mock 和真接口最大区别是什么？（自己的话）

Mock 是假数据、固定写死的，后端未就绪时前端用来开发测试；真接口是后端查库返回的实时数据，发版必须用真接口。

### 为什么 Mock 结构要和 API 文档一致？（自己的话）

Mock 只是模拟真 API，后续要切真实接口；一开始结构对齐，联调时少改组件和 Pinia，减少返工。

## 复盘 · 2026-07-31

- 今天学了：Mock 概念、静态 JSON、对齐 API、env 切换思路
- 搞懂的一个概念：Mock 提效但不替代联调；结构对齐是为平滑切换
- 还不清楚的：无
- 明天优先：Day 51 · 第 14 周复盘
