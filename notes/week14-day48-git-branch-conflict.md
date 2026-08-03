# 第 14 周 · Day 48：Git 分支与冲突

> Day 47 学了 add / commit / push / pull。多人协作时，**merge 冲突**几乎躲不掉——今天搞清冲突怎么来的、长什么样、怎么解。

## 今日目标

- ✅ 说清冲突什么时候发生
- ✅ 会认冲突标记 `<<<<<<<` / `=======` / `>>>>>>>`
- ✅ 记住解决冲突的标准步骤
- ✅ 完成 `git-lab/02-git-branch-conflict` 场景自测（10 题）
- ✅ （可选）按下方实验 B 在独立目录练一次 merge 冲突
- ✅ 填写本笔记底部复盘

## 实验位置

| 实验 | 路径 |
|------|------|
| 概念自测 | `git-lab/02-git-branch-conflict/index.html`（Live Server，闭卷勿看 `check.js`） |
| 动手练（可选） | 见下方「实验 B」——在**临时目录**练，别在 Study 主分支乱试 |

**得分 10/10** ✅

---

## 冲突什么时候发生（必背）

**两个分支改了同一文件的同一区域**，Git 无法自动决定保留哪边，就会 **merge conflict（合并冲突）**。

常见场景：

| 场景 | 怎么触发的 |
|------|------------|
| 本地 merge | `git merge feat/xxx` 时，main 和 feat 都改了同一行 |
| pull / push 前 | 你本地 commit 了，同事也 push 了同一文件的同一处 |
| PR 合并 | GitHub 上点 Merge 前检测到冲突 |

> **改不同文件、同一文件不同行** → 通常 Git 能自动合并，无冲突。

---

## 冲突长什么样（必背）

文件里会出现标记：

```
<<<<<<< HEAD
const title = '首页';        ← 当前分支（你在的分支）的内容
=======
const title = 'Home Page';   ← 要合并进来的分支的内容
>>>>>>> feat/i18n
```

| 标记 | 含义 |
|------|------|
| `<<<<<<< HEAD` | 当前分支版本开始 |
| `=======` | 分隔线 |
| `>>>>>>> 分支名` | 对方分支版本结束 |

**你要做的：** 删掉所有标记行，保留正确代码（或两边合并成一段），让文件变成合法内容。

---

## 解决冲突标准流程（必背）

```bash
# 1. 合并时提示冲突
git merge feat/xxx
# Auto-merging app.js
# CONFLICT (content): Merge conflict in app.js

# 2. 看哪些文件冲突了
git status
# both modified: app.js

# 3. 打开 app.js，手动改，去掉 <<<<<<< ======= >>>>>>>

# 4. 标记为已解决
git add app.js

# 5. 完成这次 merge（Git 会生成 merge commit）
git commit -m "merge: 解决 feat/xxx 冲突"
```

### pull 时冲突

```bash
git pull
# CONFLICT ...
# 同样：改文件 → git add → git commit（或 git merge --continue）
```

### 想放弃这次合并

```bash
git merge --abort    # 回到 merge 之前的状态
```

---

## merge vs rebase（了解）

| | merge | rebase |
|--|-------|--------|
| 结果 | 多一条 **merge commit**，历史分叉再汇合 | 把你的 commit **挪到** 目标分支最新提交之后 |
| 历史图 | 有分叉，真实反映协作 | 更直的一条线 |
| 冲突 | 合并时可能冲突 | 变基时也可能冲突 |
| 团队常用 | ✅ 新手 / 协作默认用 merge | 个人分支整理历史时用，**不要 rebase 已 push 的公共分支** |

今天重点：**会 merge + 解冲突** 就够。

---

## Pull Request 与冲突（必背）

```
feat/user-list  ──push──▶  GitHub
                              │
                              ▼
                         开 Pull Request
                              │
                    Review + CI 通过
                              │
              ┌───────────────┴───────────────┐
              │ 无冲突 → 点 Merge            │
              │ 有冲突 → 本地 pull main       │
              │          merge / rebase 解决   │
              │          push 后再 Merge       │
              └───────────────────────────────┘
```

| 步骤 | 说明 |
|------|------|
| 开 PR | 说明改了什么，指定 Reviewer |
| Review | 同事提意见，你继续 commit push 到同一分支 |
| 解决冲突 | 本地 `git pull origin main` → 解冲突 → push |
| Merge | 合并进 main，删功能分支（可选） |

---

## 解决冲突的原则（实战）

1. **先看懂两边改了什么**，不要盲删
2. **和同事沟通**——同一功能两人都在改时，先对齐
3. **改完跑一遍项目**——冲突解了但逻辑错了更坑
4. **小步提交**——功能分支别攒太大，冲突面越小越好
5. **先 pull 再 push**——减少远程冲突

---

## 实验 B · 独立目录练冲突（可选 · 约 25 分钟）

在**任意临时文件夹**（不要在 Study 根目录 main 上练）：

```bash
mkdir git-conflict-practice && cd git-conflict-practice
git init

echo "line1" > app.txt
git add . && git commit -m "init"

git switch -c feat-a
echo "title = A" >> app.txt
git add . && git commit -m "feat-a: add title A"

git switch main
git switch -c feat-b
echo "title = B" >> app.txt
git add . && git commit -m "feat-b: add title B"

git switch main
git merge feat-a        # 先合 a，成功
git merge feat-b        # 再合 b → 冲突！

# 打开 app.txt，删冲突标记，保留 title = A 或 B 或合并
git add app.txt
git commit -m "merge: resolve conflict"

git log --oneline --graph
```

练完可整个删掉 `git-conflict-practice` 文件夹。

---

## 场景自测（10 题 · 闭卷）

在 `git-lab/02-git-branch-conflict/index.html` 选题验证。**得分 10/10** ✅

---

## 笔记区

### 冲突文件里的三行标记各表示什么？（自己的话）

`<<<<<<< HEAD` 到 `=======` 之间是**当前分支**的内容；`=======` 到 `>>>>>>> 分支名` 之间是**要合并进来**的分支内容；`=======` 是分隔线。

### 解完冲突后还要敲哪两个命令？（自己的话）

`git add` 标记冲突已解决，再 `git commit` 完成 merge；若要同步远程再 `git push`。

## 复盘 · 2026-07-30

- 今天学了：冲突成因、冲突标记、merge 解冲突流程、PR 冲突处理
- 搞懂的一个概念：改文件 → add → commit 完成合并；`merge --abort` 可撤销
- 还不清楚的：无
- 明天优先：Day 49 · ESLint 入门
