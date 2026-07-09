/**
 * Node 下快速跑验证（浏览器里也可点 index.html 的「运行验证」）
 */
import { runTests } from './exercise.js';

const errors = await runTests();
if (errors.length === 0) {
  console.log('✅ 4 个用例全部通过！');
} else {
  console.log('❌', errors.join('；'));
  process.exit(1);
}
