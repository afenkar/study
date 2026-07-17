/**
 * 参考答案 — 做完后再对照
 */
import { defineComponent, ref } from 'vue';

export const CounterDisplayReference = defineComponent({
  name: 'CounterDisplay',
  props: {
    count: { type: Number, required: true },
  },
  template: `<p class="display">分数：{{ count }}</p>`,
});

export const CounterPanelReference = defineComponent({
  name: 'CounterPanel',
  props: {
    step: { type: Number, default: 1 },
  },
  emits: ['add'],
  setup(props, { emit }) {
    function handleClick() {
      emit('add', props.step);
    }
    return { handleClick };
  },
  template: `<button class="add-btn" @click="handleClick">+{{ step }}</button>`,
});

export const ScoreBoardReference = defineComponent({
  name: 'ScoreBoard',
  components: {
    CounterDisplay: CounterDisplayReference,
    CounterPanel: CounterPanelReference,
  },
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
