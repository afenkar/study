# 第 2 周 · Day 9：手写 bind + call/apply 深化

> Day 3 你**用过** bind；今天**自己实现**它。力扣 2625 原题，面试高频。

## 今日目标

- [x] 说清 call / apply / bind 三者的区别（一句话）
- [x] 理解 bind 返回的新函数「永久绑定 this」
- [x] 完成 `js-lab/09-hand-bind/myBind.js` 中 1 个 TODO
- [x] 通过 4 个用例验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/09-hand-bind/index.html`（Live Server 打开）

---

## 三兄弟对照（必背）

| 方法 | 是否立刻执行 | 参数怎么传 | 返回值 |
|------|-------------|-----------|--------|
| **call** | ✅ 立刻 | 逐个 `fn.call(obj, a, b)` | 函数执行结果 |
| **apply** | ✅ 立刻 | 数组 `fn.apply(obj, [a, b])` | 函数执行结果 |
| **bind** | ❌ 不执行 | 先绑一部分，返回新函数 | **新函数**（this 已绑定） |

### 一句话

> **call/apply 是「立刻借 this 调用」；bind 是「先包好 this，以后再调用」。**

---

## bind 要解决什么问题？

Day 3 实验 B：`setTimeout(counter.add, 0)` → **this 丢失**

```javascript
const boundAdd = counter.add.bind(counter);
setTimeout(boundAdd, 0); // ✅ this 永远是 counter
```

---

## 手写思路（4 步）

```javascript
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const fn = this;                    // 1. 保存原函数
  return function (...callArgs) {      // 2. 返回新函数
    return fn.apply(                  // 3. 用 apply 指定 this
      thisArg,
      [...boundArgs, ...callArgs]     // 4. 合并「绑定时」和「调用时」的参数
    );
  };
};
```

### 为什么用 apply？

bind 内部需要「指定 this 并调用原函数」——这正是 **apply 干的事**。

---

## 今日 TODO 就一个

在 `myBind.js` 里实现 `Function.prototype.myBind`。

**进阶（可选，今日不要求）：** 支持 `new` 调用时 this 指向实例（面试加分，先跳过）。

---

## 笔记区

### call / apply / bind 区别（自己的话）
call/apply 立刻执行，指定this，返回执行结果
bind是先返回新函数，this永久绑定，调用时执行

### bind 核心原理（自己的话）
闭包保存 fn+thisArg->返回新函数->内部apply指定this并合并参数

## 复盘 · 2026-07-10

- 今天学了：call/apply/bind 区别，手写 myBind
- 搞懂的一个概念：bind 用闭包保存 fn+thisArg，返回新函数，内部 apply 调用
- 还不清楚的：无
- 明天优先：Day 10 · Class 与继承
