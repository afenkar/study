/**
 * Day 11 练习：手写深拷贝
 * 完成下面实现，通过 exercise.js 验证
 *
 * 要求：支持原始类型、数组、普通对象（可嵌套）
 * 今日不要求：Date / Map / Set / 循环引用
 */

export function deepClone(value) {
  // TODO 1: 原始类型（含 null）直接返回
  // 提示：typeof null === 'object'，要单独判断 null
  // if (value === null || typeof value !== 'object') return value;

  // TODO 2: 数组 → 新建数组，逐项 deepClone
  // 提示：Array.isArray(value) + map

  // TODO 3: 普通对象 → 新建对象，逐 key deepClone
  // 提示：Object.keys(value) 遍历

  // throw new Error('TODO: 实现 deepClone');
  if(value === null || typeof value !== 'object') return value;
  if(Array.isArray(value)) return value.map((item)=>deepClone(item));
  const result = {}
  for(const key of Object.keys(value)){
    result[key] = deepClone(value[key]);
  }
  return result;

  }
