# 第 14 周 · Day 51：工程化协作复盘

> Day 47–50 Git / ESLint / Mock——今天**闭卷自测**，把第 14 周串起来。

## 今日目标

- ✅ 完成 `mock-lab/02-week14-review` 自测（10 题）
- ✅ 闭卷口述：Git 流程、冲突解决、ESLint、Mock
- ✅ 错题回看 Day 47–50 笔记
- ✅ 填写本笔记底部复盘

## 实验位置

`mock-lab/02-week14-review/index.html`（Live Server 打开，闭卷勿看 `check.js`）

**得分 10/10** ✅（口述自检 4/4 过）

---

## 知识地图（Day 47–50）

| 天 | 主题 | 一句话 |
|----|------|--------|
| Day 47 | Git 入门 | 工作区→add→暂存→commit→本地→push 远程 |
| Day 48 | 分支与冲突 | 同区域改动 merge 冲突；改文件→add→commit |
| Day 49 | ESLint | 查质量；Prettier 管格式；fix 只改安全项 |
| Day 50 | Mock | 假数据并行开发；结构对齐 API；不替代联调 |

### 一句话串讲

> **Git add/commit/push/pull；冲突删标记再 add+commit；ESLint 管对错、fix 有限；Mock 对齐文档、联调换真接口。**

---

## 口述清单（15 分钟）

1. **Git 三区域？** 工作区 → 暂存区（add）→ 本地仓库（commit）→ push 远程
2. **pull / push？** pull 拉远程合并；push 推本地 commit 上去
3. **冲突怎么解？** 打开文件删 `<<<<<<<` / `=======` / `>>>>>>>` → add → commit
4. **ESLint vs Prettier？** ESLint 质量/规则；Prettier 排版
5. **`--fix` 能改什么？** prefer-const、typeof 的 == 等；unused/console/变量 == 要手改
6. **Mock 何时用？** 后端未就绪、并行开发；结构跟 API 文档一致

---

## 笔记区

### 今天最容易忘的一点

`--fix` 不能修 unused / 变量 `==`；Mock 不能替代真联调

### 口述自检（过/不过）

- Git 三区域 + push/pull：**过** — 工作区编辑 → add 暂存 → commit 本地 → push 上传；pull 拉远程
- 冲突解决流程：**过** — 找冲突文件 → 删标记、和同事对齐 → add → commit
- ESLint + lint:fix：**过** — ESLint 管规则/质量；fix 只修安全项，其余手改
- Mock 原则：**过** — 结构对齐 API；env 开关切换 mock/真接口

## 复盘 · 2026-07-31

- 今天学了：第 14 周 Git / ESLint / Mock 闭卷复盘
- 搞懂的一个概念：工程化协作一条线：版本控制 → 规范检查 → Mock 并行开发
- 还不清楚的：无
- 明天优先：Day 52 · 40WEB 项目面试化（见 `interview/project-portfolio.md`）
