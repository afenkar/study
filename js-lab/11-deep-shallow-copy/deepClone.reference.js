/**
 * 参考答案 — 做完后再对照
 */
export function deepCloneReference(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepCloneReference(item));
  }

  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = deepCloneReference(value[key]);
  }
  return result;
}
