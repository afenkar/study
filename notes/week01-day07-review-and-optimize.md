# 第 1 周 · Day 7：Todo 优化 + 第 1 周复盘

> 主线：**把 Day 6 项目写得更干净** → **闭卷自测 Day 1–6** → **为第 2 周做准备**

## 今日目标

- [x] 优化 `js-lab/06-pure-js-todo/js/todoStore.js`（3 处小重构）
- [x] 完成 `js-lab/07-week1-review` 自测题（10 题）
- [x] 15 分钟闭卷口述：闭包、this、原型、事件循环各一句
- [x] 填写本笔记底部复盘

---

## Part 1 · Todo 优化（约 45 分钟）

打开 `js-lab/06-pure-js-todo/index.html`，对照 `todoStore.reference.js` 做以下 3 处改进：

### 优化 1：`toggle` 用 `find` 代替 `forEach`

```javascript
// 现在
todos.forEach((t) => { if (t.id == id) t.completed = !t.completed; });

// 建议
const item = todos.find((t) => t.id === id);
if (item) item.completed = !item.completed;
```

**为什么？** 找到就停，语义更清晰；`===` 比 `==` 更严格。

### 优化 2：`getActiveCount` 用 `filter`

```javascript
// 现在：手动 forEach 计数
// 建议
return todos.filter((t) => !t.completed).length;
```

**为什么？** 一行表达「数未完成的」；和 `clearCompleted` 写法对称。

### 优化 3（可选）：`id` 用 `crypto.randomUUID()`

```javascript
id: crypto.randomUUID(),  // 替代 Date.now()
```

**为什么？** 快速连点添加时 `Date.now()` 可能重复；UUID 更安全。

### 验收

改完后手动测一遍：添加、切换、删除、筛选、刷新持久化、清除已完成。

---

## Part 2 · 第 1 周知识地图（Day 1–6）

| 天 | 主题 | 一句话（面试版） |
|----|------|------------------|
| Day 1 | 作用域与闭包 | 闭包 = 函数 + 外层词法变量；内部仍被引用 → 外层无法释放 |
| Day 2 | 执行上下文 | 创建阶段登记变量 → 执行阶段赋值；var 提升为 undefined，let 有 TDZ |
| Day 3 | this | 普通函数看调用者；箭头继承定义处外层 this；bind 返回新函数 |
| Day 4 | 原型链 | 查找：自身 → `__proto__` → … → null；new 四步 |
| Day 5 | 异步 | 同步 → 一个宏任务 → 清空微任务 → 循环；Promise.then 是微任务 |
| Day 6 | Todo 项目 | store（闭包）/ render（DOM）/ app（事件）分离；localStorage 持久化 |

### 经典输出（必背）

```javascript
// 1 → 3 → 2
console.log(1); setTimeout(() => console.log(2), 0); console.log(3);

// 1 → 4 → 3 → 2
console.log(1); setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3)); console.log(4);

// c → a → d → b
async function foo() { console.log('a'); await Promise.resolve(); console.log('b'); }
console.log('c'); foo(); console.log('d');
```

### 易混对照

| 易错 | 正确 |
|------|------|
| 闭包用 `this.count` | 用闭包变量 `count` |
| `f = obj.fn; f()` 报错 | 不报错，this 变 window |
| 能读到 ≠ 自身有 | 用 `hasOwnProperty` |
| `() => resolve` | `resolve` 或 `() => resolve()` |
| todos 暴露给外部直接改 | 放闭包里，只暴露方法 |

---

## Part 3 · 闭卷自测（约 30 分钟）

打开 `js-lab/07-week1-review/index.html`，完成 10 题后点「验证答案」。

**口述题（不看笔记，对着镜子说）：**

1. 闭包是什么？为什么 `for(var i)` 会打印 3 个 3？
2. var 和 let 的提升有什么区别？
3. `obj.fn()` 和 `const f = obj.fn; f()` 的 this 分别是什么？
4. `new Foo()` 做了哪四步？
5. 宏任务和微任务各举两个例子；上面第三段代码输出顺序是什么？

---

## Part 4 · 第 1 周验收清单

- [ ] `js-lab/01` ~ `05` 实验都跑过一遍
- [ ] `06-pure-js-todo` 六项功能正常
- [ ] 自测 10 题 ≥ 8 题正确
- [ ] 能不看笔记讲清 Day 1–5 各一个概念

**通过后：** 第 1 周 JavaScript 地基 ✅，下周进入执行上下文 / this 深化（或按 ROADMAP 第 2 周主题）。

---

## 笔记区

### 优化后我改了什么？

（填写）

### 自测错了哪几题？错因？

（填写）

### 第 1 周最大的收获

（填写）

## 复盘 · 2026-07-07

- 今天学了：Todo 三处重构、第 1 周全周复盘、10 题自测
- 搞懂的一个概念：find/filter 比 forEach 语义更清晰；第 1 周地基验收通过
- 还不清楚的：
- 明天优先：第 2 周 Day 1 · 手写简易 Promise
