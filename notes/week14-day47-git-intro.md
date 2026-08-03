# 第 14 周 · Day 47：Git 协作入门

> 第 13 周浏览器与性能已过关。真实项目离不开 **Git**——今天搞清版本控制是什么、常用命令干什么、协作时怎么推/拉代码。

## 今日目标

- ✅ 说清 Git 三个区域：工作区 / 暂存区 / 本地仓库
- ✅ 记住 `add` / `commit` / `push` / `pull` / `branch` 各干什么
- ✅ 在本仓库动手跑一遍基础命令（见下方实验 B）
- ✅ 完成 `git-lab/01-git-basics` 场景自测（10 题）
- ✅ 填写本笔记底部复盘

## 实验位置

| 实验 | 路径 |
|------|------|
| 概念自测 | `git-lab/01-git-basics/index.html`（Live Server 打开，闭卷勿看 `check.js`） |
| 动手练（可选） | 在 `Study/` 仓库终端里执行下方命令 |

**得分 10/10** ✅

---

## Git 是什么（必背）

**Git** = **分布式版本控制系统**，记录文件每次改动，可回退、可协作。

| | Git | GitHub / GitLab |
|--|-----|-----------------|
| 是什么 | **工具**（装在本机） | **托管平台**（放远程仓库） |
| 干什么 | 本地 commit、分支、合并 | 存代码、PR、Review、CI |

### 一句话

> **Git 管版本；GitHub 放远程仓库，团队通过 push / pull 协作。**

---

## 三个区域（必背）

```
工作区（你改的文件）
    │  git add
    ▼
暂存区（staging，待提交快照）
    │  git commit
    ▼
本地仓库（.git，有完整历史）
    │  git push
    ▼
远程仓库（GitHub 等）
```

| 区域 | 是什么 |
|------|--------|
| **工作区** | 磁盘上正在编辑的文件 |
| **暂存区** | `git add` 后，下次 commit 要打包的内容 |
| **本地仓库** | `git commit` 后永久记录的快照 |

> **`git add` 不是提交**，只是「选中要进这次 commit 的改动」。

---

## 常用命令（必背）

| 命令 | 干什么 |
|------|--------|
| `git status` | 看哪些文件改了、是否在暂存区 |
| `git add <文件>` / `git add .` | 改动放进暂存区 |
| `git commit -m "说明"` | 暂存区 → 本地仓库，写一条记录 |
| `git log` / `git log --oneline` | 看提交历史 |
| `git branch` | 看本地分支列表 |
| `git switch -c feat/xxx` | 新建并切到功能分支（Git 2.23+） |
| `git switch main` | 切回主分支 |
| `git merge feat/xxx` | 把某分支合并进当前分支 |
| `git pull` | 拉远程最新代码并合并到本地 |
| `git push` | 把本地 commit 推到远程 |

旧写法 `git checkout -b` / `git checkout main` 仍常见，意思类似 `switch`。

---

## 分支协作（必背）

```
main（稳定，可部署）
  │
  ├── feat/login    ← 你开发登录
  └── fix/table-bug ← 同事修 bug
```

| 概念 | 说明 |
|------|------|
| **main / master** | 主分支，一般放可发布代码 |
| **功能分支** | 一个需求一条分支，做完 merge 回 main |
| **merge** | 把分支历史合进来（可能产生冲突，Day 48 细讲） |

### 典型流程

```bash
git switch main
git pull                    # 先更新 main
git switch -c feat/user-list
# …改代码…
git add .
git commit -m "feat: 用户列表分页"
git push -u origin feat/user-list   # 首次推送设 upstream
# 在 GitHub 开 Pull Request → Review → 合并
```

---

## 提交信息规范（了解 · 面试常问）

常用 **Conventional Commits** 前缀：

| 前缀 | 含义 | 例子 |
|------|------|------|
| `feat:` | 新功能 | `feat: 添加用户搜索` |
| `fix:` | 修 bug | `fix: 修复分页越界` |
| `docs:` | 文档 | `docs: 更新 README` |
| `chore:` | 杂项 / 构建 | `chore: 升级 vite` |

> **动词开头、说清做了什么**，方便 `git log` 和 Code Review。

---

## .gitignore（必背）

告诉 Git **哪些文件不要跟踪**：

```
node_modules/
dist/
.env.local
.DS_Store
```

密钥、依赖、构建产物、本地配置 **不要 commit**。

---

## 实验 B · 动手练（约 20 分钟）

在 `Study/` 目录打开终端（**只读操作，不会改仓库**）：

```bash
# 1. 当前状态
git status

# 2. 最近 5 条提交
git log --oneline -5

# 3. 当前分支
git branch

# 4. 看某文件谁改的（了解）
git log --oneline -- notes/week13-day46-week13-review.md
```

观察：`status` 红/绿含义、`log` 里 commit message 格式。

---

## 场景自测（10 题 · 闭卷）

在 `git-lab/01-git-basics/index.html` 选题验证。**得分 10/10** ✅

---

## 笔记区

### Git 三个区域你怎么记？（自己的话）

工作区：本地正在编辑的文件；暂存区：`git add` 后待打包进 commit 的改动；本地仓库：`git commit` 后永久记录的快照。

### 协作时 pull 和 push 各干什么？（自己的话）

pull 从远程拉最新代码并合并到本地，保持同步；push 把本地 commit 推到远程，让同事能拿到你的改动。

## 复盘 · 2026-07-30

- 今天学了：Git 三区域、常用命令、分支协作流程、commit 规范
- 搞懂的一个概念：add → commit → push 一条线；pull 同步、push 上传
- 还不清楚的：无
- 明天优先：Day 48 · Git 分支与冲突
