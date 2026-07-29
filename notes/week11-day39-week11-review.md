# 第 11 周 · Day 39：Vite 复盘自测

> Day 37–38 Vite 入门 + env + 打包——今天**闭卷自测**，把 dev / build / 环境变量 / 拆包串起来。

## 今日目标

- ✅ 完成 `vite-lab/03-week11-review` 自测（10 题）
- ✅ 闭卷口述：dev vs build、env 优先级、动态 import
- ✅ 错题回看 Day 37 / Day 38 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`vite-lab/03-week11-review/index.html`（Live Server 打开）

**得分 10/10** — 第 11 周 Vite 过关 ✅

---

## 知识地图（Day 37 + 38）

| 概念 | 一句话 |
|------|--------|
| dev | 开发服务器 + HMR，不写 dist |
| build | 打包到 dist/，压缩优化 |
| preview | 本地预览 dist |
| VITE_ | 只有此前缀暴露给前端 |
| env 优先级 | 后加载覆盖先加载；dev 最高 `.env.development.local` |
| 动态 import | 拆独立 chunk，按需加载，减小首屏 |

### 一句话串讲

> **dev 边写边看；build 出 dist；env 用 VITE_ + import.meta.env；dev 覆盖用 development.local；动态 import 拆包减首屏。**

---

## 口述清单（15 分钟）

1. **dev 和 build 区别？**

dev 开发调试 + HMR；build 生成 dist 上线。

2. **环境变量怎么读？前缀？**

`import.meta.env.VITE_XXX`；必须 `VITE_` 前缀才进前端。

3. **dev 下 env 谁优先级最高？**

`.env.development.local`（不是 `.env.local`）。

4. **改 .env 后界面没变？**

必须 Ctrl+C 重启 `npm run dev`，HMR 不更新 env。

5. **动态 import 拆包好处？**

首屏只下主包，用到再加载 chunk。

---

## 笔记区

### 今天最容易忘的一点

env 优先级顺序：`.env` → `.env.local` → `.env.development` → `.env.development.local`（后盖前）

### 口述自检（过/不过）

- dev / build / preview：**过** — dev 开发服务器 + HMR；build 打包 dist；preview 本地预览 build 结果
- VITE_ 与 import.meta.env：**过** — `VITE_` 暴露给前端；用 `import.meta.env` 读取
- env 优先级：**过** — 后加载覆盖先加载；dev 最高 `.env.development.local`
- 动态 import 拆包：**过** — 按需加载，首屏更小

## 复盘 · 2026-07-27

- 今天学了：第 11 周 Vite 闭卷复盘 10/10
- 搞懂的一个概念：dev / build / env 优先级 / 拆包能串讲
- 还不清楚的：无
- 明天优先：Day 40 · HTTP 入门（第 12 周）
