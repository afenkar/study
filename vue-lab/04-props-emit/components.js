/**
 * Day 23 练习：props 与 emit
 */
import { defineComponent, ref } from 'vue';

// TODO 1: CounterDisplay
export const CounterDisplay = defineComponent({
  props:{count:{type:Number,required:1}},
  name: 'CounterDisplay',
  template: `<p class="display">分数：{{ count }}</p>`,
});

// TODO 2: CounterPanel
export const CounterPanel = defineComponent({
  props:{step:{type:Number,default:1}},
  emits:['add'],
  name: 'CounterPanel',
  setup(props, { emit }) {
    function handleClick() {
      emit('add',props.step)
    }
    return { handleClick };
  },
  template: `<button class="add-btn" @click="handleClick">+{{ step }}</button>`,
});

export const ScoreBoard = defineComponent({
  name: 'ScoreBoard',
  components: { CounterDisplay, CounterPanel },
  setup() {
    const score = ref(0);
    function onAdd(step) {
      score.value += step;
    }
    return { score, onAdd };
  },
  template: `
    <CounterDisplay :count="score" />
    <CounterPanel :step="2" @add="onAdd" />
  `,
});
