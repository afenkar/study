# 第 13 周 · Day 44：浏览器渲染入门

> 第 12 周 HTTP 已过关。前端不只写 Vue——还要知道**浏览器怎么把 HTML/CSS 画到屏幕上**。

## 今日目标

- ✅ 说清 DOM / CSSOM / 渲染树 / 布局 / 绘制的流程
- ✅ 区分重排（reflow）和重绘（repaint）
- ✅ 完成 `web-lab/05-browser-render` 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

`web-lab/05-browser-render/index.html`（Live Server 打开）

**得分 10/10** ✅

---

## 浏览器渲染流程（必背）

```
HTML  ──解析──▶  DOM 树
                        ╲
CSS   ──解析──▶  CSSOM 树 ──▶  渲染树（Render Tree）
                                      │
                                      ▼
                                   Layout（布局/重排）
                                      │
                                      ▼
                                   Paint（绘制/重绘）
                                      │
                                      ▼
                                 Composite（合成，部分场景）
```

### 各步干什么

| 步骤 | 干什么 |
|------|--------|
| **DOM** | HTML 标签 → 树形结构 |
| **CSSOM** | CSS 规则 → 样式树 |
| **渲染树** | DOM + CSSOM，**不含** `display:none` 等不可见节点 |
| **Layout** | 算每个元素位置、大小（也叫 **Reflow 重排**） |
| **Paint** | 把像素画出来（**Repaint 重绘**） |
| **Composite** | 图层合成（transform、opacity 等可能只走合成） |

### 一句话

> **HTML/CSS 变渲染树 → 算布局 → 画像素。**

---

## 重排 vs 重绘（必背 · 常考）

| | 重排 Reflow | 重绘 Repaint |
|--|-------------|--------------|
| 干什么 | 重新算布局（位置、大小） | 重新画外观（颜色等），布局可能不变 |
| 开销 | **更大** | 相对小 |
| 典型触发 | 改 width/height、增删 DOM、读 offsetTop | 改 color、background |

**重排通常也会触发重绘；重绘不一定重排。**

### 常见触发重排的操作

- 改元素宽高、margin、padding
- 增删 DOM 节点
- 读 `offsetWidth`、`getBoundingClientRect()`（强制同步布局）
- 窗口 resize

### 优化方向（了解）

- 批量改 DOM，减少频繁操作
- 动画优先 `transform` / `opacity`（可能只合成，跳过 layout）
- Vue 虚拟 DOM 的意义之一：合并更新，减少直接 DOM 折腾

---

## 和 JS 的关系（了解）

- HTML 解析遇 `<script>` 可能**阻塞** DOM 构建（除非 `defer` / `async`）
- JS 改 DOM / 改样式 → 可能触发重排/重绘
- 事件循环（Day 17 学过）：JS 执行完再渲染更新

---

## 场景自测（10 题 · 闭卷）

在实验页选题验证。**得分 10/10**。

---

## 笔记区

### 重排和重绘你怎么记？（自己的话）

重排 = 重新算布局，开销大；重绘 = 重新画外观，布局可能不变，开销相对小。重排通常会重绘，重绘不一定重排。

### 渲染流程你怎么串？（自己的话）

DOM + CSSOM → 渲染树 → Layout（重排）→ Paint（重绘）→ Composite（合成）

## 复盘 · 2026-07-29

- 今天学了：浏览器渲染流程、重排 vs 重绘
- 搞懂的一个概念：改宽高重排、改颜色重绘；transform 动画可少重排
- 还不清楚的：无
- 明天优先：Day 45 · Web 性能指标 FCP / LCP
