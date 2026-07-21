# JS 面试模拟 · 第 1 套

> 闭卷 · 无提示 · 建议 45–60 分钟  
> 做完把答案写在本文底部「作答区」，或另存为 `js-mock-01-answers.md`

---

## 一、输出题（写最终输出，含顺序）

### 1

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
console.log(i);
```

你的答案：3 3 3 3


### 2

```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
```

你的答案：1 4 3 2


### 3

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(() => console.log('setTimeout'), 0);
async1();
new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => console.log('promise2'));
console.log('script end');
```

你的答案：script start async1 start async2 script end promise1 async1 end promise2 setTimeout


### 4

```javascript
const obj = {
  name: 'foo',
  getName() {
    return this.name;
  },
};
const fn = obj.getName;
console.log(obj.getName());
console.log(fn());
```

你的答案：foo undefined


---

## 二、概念简答（每题 2–3 句，用自己的话）

### 5

什么是闭包？业务里你会在什么场景用到？

你的答案：闭包就是内部函数+外部作用域能访问到的变量
场景：防抖 节流 


### 6

`call`、`apply`、`bind` 区别是什么？各举一个使用场景。

你的答案：call、apply都是立刻执行返回
bind是返回新函数 后续调用执行
call绑定字符串、对象 apply绑定数组 


### 7

浅拷贝和深拷贝区别？下面代码执行后 `origin.nest` 和 `copy.nest` 是什么关系？

```javascript
const origin = { nest: { x: 1 } };
const copy = { ...origin };
copy.nest.x = 99;
```

你的答案：
浅拷贝拷贝第一层，其他嵌套层共享内存地址。
深拷贝全部拷贝新增，修改不影响原始值。
{ ...origin };是浅拷贝，所以修改x值会共同修改，origin.nest.x =copy.nest.x= 99;
---

## 三、手写题

### 8

实现 `debounce(fn, delay)`：连续触发时，只在最后一次停止 `delay` 毫秒后执行。

```javascript
function debounce(fn, delay) {
  // 你的实现
  let timer = 0;
  return function (...args){
    clearTimeout(timer)
    timer = setTimeout(()=>{
    apply(fn,args)
  }，delay)
  }
  
}
```

你的答案：
function debounce(fn, delay) {
  // 你的实现
  let timer = 0;
  return function (...args){
    clearTimeout(timer)
    timer = setTimeout(()=>{
    fn.apply(this,args)
  }，delay)
  }
  
}

---

## 四、场景设计题（口述思路即可）

### 9

页面有一个搜索框，用户每输入一个字就调接口。你会怎么处理？说明为什么，以及用到了哪些 JS 知识。

你的答案：
可以用防抖闭包、或者watch监听，如果是我，我会用监听 会更方便
用到了闭包、this指向的知识

---

## 作答区 · 复盘

- 完成日期：2026-07-18
- 得分：**7 / 9**
- 最容易错的题：第 1 题漏同步输出；第 3 题 promise1 与 script end 顺序；第 8 题手写
- 需要回看的笔记：`week04-day17-event-loop-advanced.md`、`week03-day13-debounce-throttle.md`

---

## 批改 · 2026-07-18

| 题 | 结果 | 说明 |
|----|------|------|
| 1 | ⚠️ | 完整输出是 **3, 3, 3, 3**。你写了三个 3，漏了循环后同步的 `console.log(i)` |
| 2 | ✅ | 1 → 4 → 3 → 2 |
| 3 | ❌ | 正确：**script start → async1 start → async2 → promise1 → script end → async1 end → promise2 → setTimeout**。你把 `script end` 和 `promise1` 顺序写反了 |
| 4 | ✅ | foo → undefined（严格模式下 fn() 丢失 this） |
| 5 | ✅ | 闭包 + 防抖/节流场景 OK |
| 6 | ✅ | 核心对；补充：call/apply 是**立即执行**，区别在参数列表 vs 数组 |
| 7 | ✅ | 浅拷贝 + 共享 nest，origin/copy 都是 99 |
| 8 | ❌ | 应先 `clearTimeout` 再 `setTimeout`；用 `fn.apply(this, args)`；箭头函数语法 `=>` |
| 9 | ⚠️ | 提到防抖 ✅；「用 watch 更方便」是 Vue 写法，JS 面试应主打 **debounce + 闭包存 timer**；this 与本题关系不大 |

### 第 8 题参考写法

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```
