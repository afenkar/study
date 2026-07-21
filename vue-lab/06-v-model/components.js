/**
 * Day 25 练习：v-model 本质
 */
import { defineComponent, ref } from 'vue';

// TODO 1: TextField
export const TextField = defineComponent({
  name: 'TextField',
  props: { modelValue: { type: String, default: '1' } },
  emits:['update:modelValue'],
  setup(props, { emit }) {
    function onInput(e){
      emit('update:modelValue',e.target.value)
    }
    return {onInput}
  },
  template: `<input class="text-field" :value="modelValue" @input="onInput"/>`,
});

// TODO 2: ToggleSwitch
export const ToggleSwitch = defineComponent({
  name: 'ToggleSwitch',
  props: { modelValue: { type: Boolean, default: false } },
  emits:['update:modelValue'],
  setup(props,{emit}) {
    function toggle(e) {
      // throw new Error('TODO 2');
      emit('update:modelValue',!props.modelValue)
    }
    return { toggle };
  },
  template: `<button class="toggle-btn" @click="toggle">切换</button>`,
});

export const FormDemo = defineComponent({
  name: 'FormDemo',
  components: { TextField, ToggleSwitch },
  setup() {
    const keyword = ref('');
    const enabled = ref(false);
    return { keyword, enabled };
  },
  template: `
    <TextField v-model="keyword" />
    <p class="preview">输入：{{ keyword }}</p>
    <ToggleSwitch v-model="enabled" />
    <p class="status">开关：{{ enabled ? '开' : '关' }}</p>
  `,
});
