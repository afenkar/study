/**
 * 参考答案 — 做完后再对照
 */
export function sleepReference(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runSerialReference(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
