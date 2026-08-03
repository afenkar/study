# 第 13 周 · Day 46：浏览器与性能复盘

> Day 44–45 渲染流程 + FCP/LCP——今天**闭卷自测**，把第 13 周串起来。

## 今日目标

- ✅ 完成 `web-lab/07-week13-review` 自测（10 题）
- ✅ 闭卷口述：渲染流程、重排/重绘、FCP/LCP
- ✅ 错题回看 Day 44 / Day 45 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`web-lab/07-week13-review/index.html`（Live Server 打开，闭卷勿看 `check.js`）

**得分：完成 ✅**（口述自检 4/4 过）

---

## 知识地图（Day 44–45）

| 概念 | 一句话 |
|------|--------|
| DOM / CSSOM | HTML / CSS 解析成树 |
| 渲染树 | DOM + CSSOM，不含不可见节点 |
| Layout / Paint | 重排算布局；重绘画像素 |
| 重排 vs 重绘 | 重排开销大；重排通常也重绘 |
| FCP | 首次有内容（告别白屏） |
| LCP | 最大内容完成（主内容到位） |
| 优化 | transform 动画；首屏大图 WebP + preload |

### 一句话串讲

> **DOM+CSSOM→渲染树→布局→绘制；改宽高重排、改色重绘；FCP 首次内容、LCP 主内容。**

---

## 口述清单（15 分钟）

1. **渲染流程？** DOM + CSSOM → 渲染树 → Layout → Paint
2. **重排和重绘？** 重排算布局开销大；重绘只画外观；重排通常也重绘
3. **FCP vs LCP？** FCP 第一次有内容；LCP 最大块完成；LCP 通常更晚
4. **动画优化？** 优先 transform / opacity，少触发重排
5. **怎么测性能？** Lighthouse / Performance 看 FCP、LCP

---

## 笔记区

### 今天最容易忘的一点

首屏大图用 **preload + WebP**，不要 lazy；lazy 只给非首屏图

### 口述自检（过/不过）

- 渲染流程：**过** — HTML→DOM、CSS→CSSOM，合并渲染树→布局→绘制
- 重排 / 重绘：**过** — 重排算布局；重绘画外观；重排一定重绘，重绘不一定重排
- FCP / LCP：**过** — FCP 首次有内容；LCP 最大内容块完成
- 优化方向：**过** — transform 少重排；大图 WebP；首屏 preload、非首屏 lazy

## 复盘 · 2026-07-30

- 今天学了：第 13 周浏览器渲染 + Web Vitals 闭卷复盘
- 搞懂的一个概念：重排/重绘关系 + FCP/LCP 时间线能串讲
- 还不清楚的：无
- 明天优先：Day 47 · Git 协作入门（第 14 周）
