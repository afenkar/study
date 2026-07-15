/**
 * 参考答案 — 做完后再对照
 */
Function.prototype.myBindReference = function (thisArg, ...boundArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(thisArg, [...boundArgs, ...callArgs]);
  };
};

export {};
