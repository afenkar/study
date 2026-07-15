/**
 * 参考答案 — 做完后再对照
 */
export function myNewReference(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const result = Ctor.apply(obj, args);
  return result !== null && typeof result === 'object' ? result : obj;
}
