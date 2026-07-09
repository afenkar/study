# 第1周 · Day 6：纯 JS Todo 综合项目

> 把 Day 1–5 用起来：闭包（私有 todos）、模块化、localStorage、DOM 事件。

## 项目位置
`js-lab/06-pure-js-todo/index.html`

## 今日目标
- ✅ 理解项目结构（store / render / app 分离）
- ✅ 完成 `todoStore.js` 中 5 个 TODO
- ✅ 能添加、切换完成、删除、筛选、持久化
- ✅ 说清：为什么 todos 放在闭包里

## 验收标准
- ✅ 添加待办后列表更新
- ✅ 勾选切换完成状态
- ✅ 删除单条有效
- ✅ 三个筛选按钮有效
- ✅ 刷新页面数据还在（localStorage）
- ✅ 清除已完成有效

## 笔记区

### 为什么 todos 放闭包里？
外部不能直接改 todos，只能通过 store 提供的方法操作，数据更安全；每次 createTodoStore() 有独立状态（闭包）。

### 三个文件各负责什么？
- **todoStore.js**：数据 + 业务逻辑 + localStorage
- **render.js**：只负责把数据画到 DOM
- **app.js**：绑事件，连接 store 和 render

### 老师反馈（检查日）
- 5 个 TODO 逻辑全对 ✅
- 小改进：`add` 应 `trim()` 并拒绝空字符串（已帮你补上）

## 复盘 · 2026-07-07
- 今天学了：三层结构、闭包 store、localStorage 持久化
- 搞懂的一个概念：数据改完要 save()，刷新从 load() 恢复
- 还不清楚的：
- 明天优先：Day 7 优化与第 1 周复盘
