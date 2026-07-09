# 第 1 周 · JavaScript 地基总结（Day 1–5）

> 主线：作用域 → 执行上下文 → this → 原型 → 异步

---

## Day 1 · 作用域与闭包

- **var**：函数作用域；**let/const**：块级作用域
- **闭包**：函数 + 外层变量；内部函数仍被使用 → 外层无法释放 → 变量存活
- **循环 var 坑**：多个回调共享同一个 i → 用 let / IIFE / setTimeout 第三参数
- **createMultiplier**：每次调用新建闭包，互不影响

---

## Day 2 · 执行上下文与提升

- **两阶段**：创建（登记 var/function）→ 执行（赋值、调用）
- **var** 提升为 undefined；**let** 有 TDZ；**function 声明**整体提升
- 解释 Day 1：`for(var i)` 只有一个 i

---

## Day 3 · this

- **普通函数**：谁调用，this 指向谁
- **箭头函数**：继承定义处外层 this
- **this 丢失**：方法拆下来普通调用 → 用箭头 / bind / `obj.method()`
- **call** 立刻执行；**bind** 返回新函数

---

## Day 4 · 原型链

- 查找：自身 → `__proto__` → … → null
- **Person.prototype**（构造函数）← **p.__proto__**（实例）
- **new 四步**：创建对象 → 连原型 → 执行构造函数 → 返回
- **instanceof**：沿原型链找 X.prototype
- **能读到 ≠ 自身有**（hasOwn）

---

## Day 5 · 异步与事件循环

- **同步先跑完** → 一个**宏任务** → **清空微任务** → 循环
- **Promise.then**、**await 后面** = 微任务；**setTimeout** = 宏任务
- **async/await** = Promise 语法糖
- **sleep**：`await new Promise(r => setTimeout(r, millis))`
- **易错**：`() => resolve` 没调用 resolve，Promise 不会完成

---

## 经典输出顺序（必背）

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

## 易混对照

| 易错 | 正确 |
|------|------|
| 闭包用 `this.count` | 用闭包变量 `count` |
| `f = obj.fn; f()` 报错 | 不报错，this 变 window |
| 包装函数 this 要是 obj | 用 `obj.method()` 显式调用 |
| `setTimeout`  alone 能 await 等 | 要 `new Promise + setTimeout(resolve)` |
| `() => resolve` | `resolve` 或 `() => resolve()` |

---

## 下一步

**Day 6–7**：纯 JS Todo 项目（闭包 + 模块化 + localStorage）
