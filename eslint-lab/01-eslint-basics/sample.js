/**
 * Day 49 · 故意留 lint 问题，供 npm run lint 练习
 * 目标：改到 npm run lint 通过
 */

let count = 0; // count 会被 += 修改，用 let 是对的

// const unusedHelper = 'remove me'; // no-unused-vars：需手删或用起来

export function isSame(a, b) {
  // console.log('checking'); // no-console
  if (a === b) {
    // eqeqeq：应使用 ===
    count += 1;
    return true;
  }
  return false;
}

export function getCount() {
  return count;
}
