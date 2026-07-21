/**
 * 参考答案 — 做完后再对照
 */
import { defineComponent, ref } from 'vue';

export const TextFieldReference = defineComponent({
  name: 'TextField',
  props: { modelValue: { type: String, default: '' } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function onInput(e) {
      emit('update:modelValue', e.target.value);
    }
    return { onInput };
  },
  template: `<input class="text-field" :value="modelValue" @input="onInput" />`,
});

export const ToggleSwitchReference = defineComponent({
  name: 'ToggleSwitch',
  props: { modelValue: { type: Boolean, default: false } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function toggle() {
      emit('update:modelValue', !props.modelValue);
    }
    return { toggle };
  },
  template: `
    <button class="toggle-btn" @click="toggle">
      {{ modelValue ? '开' : '关' }}
    </button>
  `,
});

export const FormDemoReference = defineComponent({
  name: 'FormDemo',
  components: {
    TextField: TextFieldReference,
    ToggleSwitch: ToggleSwitchReference,
  },
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
