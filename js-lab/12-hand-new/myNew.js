/**
 * Day 12 练习：手写 new
 * 完成 TODO，通过 exercise.js 验证
 *
 * myNew(Ctor, ...args) 应等价于 new Ctor(...args)
 */

export function myNew(Ctor, ...args) {
  // TODO 1: 创建对象，并让其原型指向 Ctor.prototype
  // 提示：Object.create(Ctor.prototype)

  // TODO 2: 用该对象作为 this 调用 Ctor，传入 args
  // 提示：Ctor.apply(obj, args)

  // TODO 3: 若 Ctor 返回对象（含数组等），用返回值；否则用步骤 1 的对象
  // 提示：result !== null && typeof result === 'object'

  // throw new Error('TODO: 实现 myNew');

  const obj = {}
  Object.setPrototypeOf(obj,Ctor.prototype);
  const result = Ctor.apply(obj,args)
  return (result !== null && typeof result === 'object')? result : obj;
}
