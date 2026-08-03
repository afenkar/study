/**
 * Day 49 · 观察 eslint --fix 哪些能改、哪些不能
 *
 * 运行：npm run lint:fix
 *
 * 预期：
 * - typeof … == 'string'  → 自动改成 ===（可 fix）
 * - let neverReassign     → 自动改成 const（可 fix）
 * - a == b（两个变量）    → 不会自动改（只 suggest）
 * - 不要用 if (1 == 2) 演示：fix 后会触发 no-constant-condition
 */

const neverReassign = 42;

export function equal(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a === 'string') {
    return false;
  }
  // 演示用：1 == 2 会被 --fix 改成 1 === 2，但 if (1 === 2) 又触发 no-constant-condition（恒假条件）
  // 实战里应删掉这种死代码，不要写 if (1 === 2)
  return neverReassign > 0;
}
