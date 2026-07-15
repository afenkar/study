import { runCloneTests, runConceptChecks, conceptAnswers } from './exercise.js';

const cloneErrors = runCloneTests();
const conceptErrors = runConceptChecks(conceptAnswers);
const all = [...cloneErrors, ...conceptErrors];

if (all.length === 0) {
  console.log('✅ deepClone + 概念题全部通过！');
} else {
  console.log('❌', all.join('；'));
  process.exit(1);
}
