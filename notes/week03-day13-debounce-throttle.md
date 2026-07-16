# 第 3 周 · Day 13：防抖与节流

> 搜索框连敲、窗口狂拖 resize——若每次都请求，会打爆接口。今天用**闭包 + 定时器**手写 `debounce` / `throttle`。

## 今日目标

- [x] 一句话分清防抖 vs 节流
- [x] 知道各自典型使用场景
- [x] 完成 `js-lab/13-debounce-throttle/debounceThrottle.js` 中 2 个 TODO
- [x] 通过练习验证
- [x] 填写本笔记底部复盘

## 实验位置

`js-lab/13-debounce-throttle/index.html`（Live Server 打开）

---

## 防抖 vs 节流（必背）

| | 防抖 debounce | 节流 throttle |
|--|---------------|---------------|
| 行为 | 停止触发后，才执行一次 | 每隔一段时间，最多执行一次 |
| 比喻 | 电梯门：一直有人进就不开，人都进完才走 | 红绿灯：每隔固定时间放行一批 |
| 场景 | 搜索框输入、表单校验 | 滚动加载、resize、按钮防连点 |

### 一句话

> **防抖：等你停手再干活；节流：按固定频率干活。**

---

## 防抖思路

```javascript
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);              // 重新计时
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
```

连续调用时，旧定时器被清掉，只有**最后一次**停够 `wait` 毫秒才会执行。

---

## 节流思路（时间戳版）

```javascript
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

距离上次执行不足 `wait` 就直接忽略；够了才执行并刷新时间戳。

---

## 今日 TODO（debounceThrottle.js）

1. 实现 `debounce(fn, wait)`
2. 实现 `throttle(fn, wait)`

---

## 笔记区

### 防抖 / 节流区别（自己的话）

防抖：停止操作达到指定时间后，再执行（等停手）
节流：固定时间间隔，间隔内不执行，超过间隔再执行（按频率）

### 搜索框用哪个？滚动加载用哪个？为什么？

搜索框用防抖：等停手再请求，少打接口
滚动加载用节流：按固定频率触发，滚动过程中也要响应

## 复盘 · 2026-07-15

- 今天学了：防抖 debounce、节流 throttle，闭包 + 定时器/时间戳实现
- 搞懂的一个概念：防抖等停手再干活；节流按固定频率干活
- 还不清楚的：无
- 明天优先：Day 14 · 第 2–3 周复盘自测
