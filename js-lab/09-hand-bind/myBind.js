/**
 * 手写 bind — Day 9
 * 力扣 2625 · Function.prototype.bind 的简易版
 *
 * 用法：fn.myBind(thisArg, ...args) → 返回新函数，this 永久指向 thisArg
 */

// TODO：实现 myBind
// 提示：保存 this(原函数) → 返回新函数 → 内部 fn.apply(thisArg, 合并参数)

Function.prototype.myBind = function (thisArg, ...boundArgs) {
  // throw new Error('TODO: 实现 myBind');
  const fn = this;
  return function (...args) {
    return fn.apply(thisArg,[...boundArgs,...args ]);
  };
};

export {}; // 让文件成为 module，避免污染全局重复声明
