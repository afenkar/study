import { runShapeTests, runConceptChecks, conceptAnswers } from './exercise.js';

const shapeErrors = runShapeTests();
const conceptErrors = runConceptChecks(conceptAnswers);
const all = [...shapeErrors, ...conceptErrors];

if (all.length === 0) {
  console.log('✅ shapes + 概念题全部通过！');
} else {
  console.log('❌', all.join('；'));
  process.exit(1);
}
