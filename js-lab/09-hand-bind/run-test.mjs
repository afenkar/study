import './myBind.js';
import { runBindTests } from './exercise.js';

const errors = runBindTests();
if (errors.length === 0) {
  console.log('✅ 4 个用例全部通过！');
} else {
  console.log('❌', errors.join('；'));
  process.exit(1);
}
