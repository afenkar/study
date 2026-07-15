import {
  runDebounceThrottleTests,
  runConceptChecks,
  conceptAnswers,
} from './exercise.js';

const fnErrors = await runDebounceThrottleTests();
const conceptErrors = runConceptChecks(conceptAnswers);
const all = [...fnErrors, ...conceptErrors];

if (all.length === 0) {
  console.log('✅ debounce / throttle + 概念题全部通过！');
} else {
  console.log('❌', all.join('；'));
  process.exit(1);
}
