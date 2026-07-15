import { runNewTests, runConceptChecks, conceptAnswers } from './exercise.js';

const newErrors = runNewTests();
const conceptErrors = runConceptChecks(conceptAnswers);
const all = [...newErrors, ...conceptErrors];

if (all.length === 0) {
  console.log('✅ myNew + 概念题全部通过！');
} else {
  console.log('❌', all.join('；'));
  process.exit(1);
}
