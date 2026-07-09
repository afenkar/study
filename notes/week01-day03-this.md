# 第1周 · 第3天：this 指向

> 关联 Day 1–2：闭包记的是外层变量；**this 记的是「谁调用我」**（箭头函数除外）。

## 今日目标
- ✅ 理解 this 的 4 种绑定规则（默认、隐式、显式、new）
- ✅ 能解释 this 丢失的原因和 fix 方法
- ✅ 会用 call / apply / bind
- ✅ 理解箭头函数的 this（继承外层）
- ✅ 完成 `js-lab/03-this-binding` 全部实验
- ✅ 完成练习 E 并通过验证

## 笔记区

### this 一句话（自己的版本）
谁调用函数，this 就指向谁

### this 一句话（补充：箭头函数）
> 上面那句对**普通函数**成立；**箭头函数**没有自己的 this，继承定义时外层的 this。

### this 四规则速记（自己的版本）
- 独立函数 `fn()` → this 是 window 或 undefined
- 隐式绑定 `obj.fn()` → this 是 obj
- 显式绑定 call / apply / bind → this 是指定的对象
- `new Fn()` → this 是新实例
- 箭头函数 → 向上找外层的 this（不是谁调用它）

### 练习 E 答案
- 题1：obj ✅
- 题2：window ✅（f = obj.fn 再 f() 不报错，只是 this 丢失）
- 题3：window ✅
- 题4：a ✅
- 题5：other ✅

### 今天还不清楚的
（无则写「无」）

## 复盘 · 2026-07-03
- 今天学了：this 四规则、this 丢失、call/apply/bind、箭头函数 this
- 搞懂的一个概念：实验 D — 普通函数 setTimeout 里 this 是 window，箭头函数继承 regular 里的 obj
- 还不清楚的：
- 明天优先：Day 4 · 原型链
