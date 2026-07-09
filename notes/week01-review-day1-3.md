# 第 1 周 · Day 1–3 复习提纲

> 三天主线：**作用域 → 执行上下文 → this**  
> 闭包记**外层变量**；this 看**谁调用**（箭头除外）。

---

## Day 1 · 作用域与闭包

### 必记
| 关键字 | 作用域 | 声明前访问 |
|--------|--------|------------|
| var | 函数 | undefined |
| let/const | 块 `{}` | ReferenceError（TDZ） |

### 闭包
- **定义**：函数 + 能访问的外层词法作用域变量（外层已 return 仍可访问）
- **为何能记住**：内部函数仍被使用 → 外层作用域无法 GC → 变量存活
- **用途**：私有变量、工厂函数、IIFE 锁循环变量

### 经典坑
```javascript
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0); // 3,3,3
// 修法：let i / IIFE / setTimeout 第三参数
```

### 实验 / 练习
- `js-lab/01-scope-closure`
- 力扣 2620：用 `count++`，**不要用 `this.count`**

---

## Day 2 · 执行上下文与提升

### 两阶段
1. **创建阶段**：登记 var（undefined）、function 声明（整体可用）
2. **执行阶段**：赋值、调用

### 提升对比
| | var | let/const | function 声明 | var fn = function |
|--|-----|-----------|---------------|-------------------|
| 提升 | ✅ undefined | ✅ TDZ | ✅ 整个函数 | 仅 var→undefined |

### 和 Day 1 的关系
- var 在 for 里只有一个 i → 创建阶段就登记好了 → 三个闭包共享同一个 i

### 实验 / 练习
- `js-lab/02-execution-context`

---

## Day 3 · this 指向

### 四规则 + 箭头
| 调用方式 | this |
|----------|------|
| `fn()` | window / undefined |
| `obj.fn()` | obj |
| `fn.call(x)` | x |
| `new Fn()` | 新实例 |
| 箭头函数 | 定义处外层的 this |

### this 丢失
- **原因**：方法拆下来普通调用 / 当回调传递 → 不再是 `obj.fn()`
- **修法**：箭头包装、`bind`、回调里 `obj.fn()`（不是 `this.fn()`）

### call / apply / bind
| | 立刻执行 | 参数 |
|--|----------|------|
| call | ✅ | 逐个 |
| apply | ✅ | 数组 |
| bind | ❌ 返回新函数 | 逐个 |

### 实验 D 必记
- setTimeout **普通函数** → this 是 window
- setTimeout **箭头函数** → 继承外层 regular 的 this（obj）

### 实验 / 练习
- `js-lab/03-this-binding`
- 力扣 2625：手写 bind

---

## 易混点（你踩过的）

| 易错 | 正确 |
|------|------|
| 闭包变量写成 `this.count` | 用闭包里的 `count` |
| `f = obj.fn; f()` 以为报错 | 不报错，this 变 window |
| 箭头在对象里 `fn: () => this` | this 是 window，不是 obj |
| 修法3 以为包装函数 this 要是 counter | 包装 this 可以是 window，关键是 `counter.add()` |

---

## 15 分钟自测（不看笔记）

1. 闭包是什么？为什么能记住变量？
2. var 和 let 提升区别？
3. `obj.fn()` 和 `const f=obj.fn; f()` 的 this？
4. call 和 bind 区别？
5. 力扣 2620 为什么不能用 `this.count++`？

---

## 本地复习路径

1. 浏览三个 `js-lab` 实验，每类各点一次按钮
2. 重做 `03-this-binding/exercise.js` 五题（心算）
3. 力扣再刷：2620、2625
