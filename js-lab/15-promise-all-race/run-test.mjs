import { runComboTests, runConceptChecks, conceptAnswers } from './exercise.js';

const comboErrors = await runComboTests();
const conceptErrors = runConceptChecks(conceptAnswers);
const all = [...comboErrors, ...conceptErrors];

if (all.length === 0) {
  console.log('✅ myAll / myRace + 概念题全部通过！');
} else {
  console.log('❌', all.join('；'));
  process.exit(1);
}
