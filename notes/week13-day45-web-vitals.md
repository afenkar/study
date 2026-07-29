# 第 13 周 · Day 45：Web 性能指标 · FCP / LCP

> Day 44 学了浏览器怎么渲染。今天学**怎么衡量「快不快」**——Core Web Vitals 里最常见的 **FCP** 和 **LCP**。

## 今日目标

- ✅ 说清 FCP、LCP 各衡量什么
- ✅ 知道 LCP 常见优化方向
- ✅ 完成 `web-lab/06-web-vitals` 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

`web-lab/06-web-vitals/index.html`（Live Server 打开）

---

## 为什么要有性能指标（必背）

「感觉快」不够——要用**可测量**的指标评估用户体验，也方便对比优化前后。

Google **Core Web Vitals（核心 Web 指标）** 里前端最常考：

| 指标 | 全称 | 衡量什么 |
|------|------|----------|
| **FCP** | First Contentful Paint | **首次**有内容出现在屏幕上 |
| **LCP** | Largest Contentful Paint | **最大**内容块渲染完成 |
| **CLS** | Cumulative Layout Shift | 布局抖动（了解） |
| **INP** | Interaction to Next Paint | 交互响应（了解，替代旧 FID） |

今天重点：**FCP + LCP**。

---

## FCP · 首次内容绘制（必背）

**第一次**用户在屏幕上看到**任意内容**（文字、图片、canvas 等）的时间点。

```
白屏 ──────────▶ FCP（出现首屏文字/图标）
                      │
                      ▼
                 继续加载...
```

| | 说明 |
|--|------|
| 衡量 | 用户从「全白」到「有点东西」多快 |
| 常见影响因素 | HTML/CSS/JS 阻塞、服务器响应慢、字体加载 |
| 体验 | FCP 越短，越少白屏焦虑 |

> **不是**整页加载完，只是**第一次**看到内容。

---

## LCP · 最大内容绘制（必背）

视口内**最大**可见内容元素（大图、大标题块、背景图等）**渲染完成**的时间。

```
FCP ──▶ 部分内容出现 ──▶ LCP（最大那块内容画完）
```

| | 说明 |
|--|------|
| 衡量 | 主内容大概什么时候能看 |
| 常见 LCP 元素 | 首屏大图、banner、大段标题、`video` 封面 |
| Google 参考（了解） | LCP ≤ 2.5s 较好 |

> LCP 通常比 FCP **晚**，是「主内容可读」的关键指标。

---

## FCP vs LCP（必背）

| | FCP | LCP |
|--|-----|-----|
| 问什么 | 第一次**有任何**内容？ | **最大**那块内容何时完成？ |
| 先后 | 通常更早 | 通常更晚 |
| 优化侧重 | 减少阻塞、加快首字节 | 压缩/预加载大图、减少 render-blocking |

### 一句话

> **FCP = 告别白屏；LCP = 主内容到位。**

---

## 常见优化方向（了解）

| 方向 | 帮谁 |
|------|------|
| 减小 JS/CSS 体积、懒加载 | FCP / LCP |
| 图片 WebP、合适尺寸、`loading="lazy"`（非首屏） | LCP |
| `<link rel="preload">` 关键资源 | LCP |
| CDN、HTTP 缓存（Day 41） | FCP / LCP |
| 服务端 SSR / 骨架屏 | FCP 体验 |

---

## 怎么测（了解）

- Chrome DevTools → **Performance** / **Lighthouse**
- 真实用户：RUM（Real User Monitoring）
- 本地 Lighthouse 跑分可看 FCP、LCP 建议

---

## 场景自测（10 题 · 闭卷）

在实验页选题验证。**得分：完成 ✅**

---

## 笔记区

### FCP 和 LCP 你怎么区分？（自己的话）

**FCP** = 第一次有内容出现（First）；**LCP** = 最大内容块渲染完成（Largest）。FCP 通常更早。

### 优化 LCP 你会先动什么？（自己的话）

首屏大图：WebP + 合适尺寸 + `preload`；减 JS/CSS 体积；非首屏图才 `lazy`；CDN / 缓存。

## 复盘 · 2026-07-29

- 今天学了：FCP / LCP、Core Web Vitals、Lighthouse 测量
- 搞懂的一个概念：FCP 告别白屏，LCP 主内容到位
- 还不清楚的：无
- 明天优先：Day 46 · 第 13 周复盘
