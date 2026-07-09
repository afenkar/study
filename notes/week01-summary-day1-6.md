# 第 1 周 · JavaScript 地基总结（Day 1–6）

> 主线：作用域 → 执行上下文 → this → 原型 → 异步 → Todo 综合项目

---

## Day 1 · 作用域与闭包

- **var**：函数作用域；**let/const**：块级作用域
- **闭包**：函数 + 外层变量；内部仍被引用 → 外层无法释放
- **循环 var 坑**：多个回调共享同一个 i → 用 let / IIFE / setTimeout 第三参数

---

## Day 2 · 执行上下文与提升

- **两阶段**：创建（登记 var/function）→ 执行（赋值、调用）
- **var** 提升为 undefined；**let** 有 TDZ；**function 声明**整体提升

---

## Day 3 · this

- **普通函数**：谁调用，this 指向谁
- **箭头函数**：继承定义处外层 this
- **call** 立刻执行；**bind** 返回新函数

---

## Day 4 · 原型链

- 查找：自身 → `__proto__` → … → null
- **new 四步**：创建对象 → 连原型 → 执行构造函数 → 返回
- **能读到 ≠ 自身有**（hasOwn）

---

## Day 5 · 异步与事件循环

- **同步先跑完** → 一个**宏任务** → **清空微任务** → 循环
- **Promise.then** = 微任务；**setTimeout** = 宏任务
- **async/await** = Promise 语法糖

---

## Day 6 · 纯 JS Todo

- **三层**：todoStore（闭包 + 业务）/ render（DOM）/ app（事件）
- **持久化**：改数据 → `save()` → `localStorage`；刷新 → `load()`
- **闭包 store**：todos 私有，外部只能通过方法操作

---

## 经典输出（必背）

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

---

## 下一步

**Day 7**：Todo 优化 + 自测验收 → 进入第 2 周
