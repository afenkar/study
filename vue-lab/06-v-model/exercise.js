/**
 * components.js + 概念题验证
 */
import { createApp, nextTick } from 'vue';
import { TextField, ToggleSwitch, FormDemo } from './components.js';

export const conceptAnswers = {
  q1: 'modelValue', // Vue 3 v-model 默认 prop？'modelValue' / 'value'
  q2: 'update:modelValue', // 子通知父更新？'update:modelValue' / 'change'
  q3: 'props+emit', // v-model 本质？'props+emit' / 'slot'
};

export async function runVModelTests() {
  const errors = [];

  function check(name, ok) {
    if (!ok) errors.push(name);
  }

  try {
    check('用例1 TextField 声明 modelValue', TextField.props?.modelValue != null);
    check('用例1 TextField 声明 update:modelValue', TextField.emits?.includes('update:modelValue'));

    check('用例2 ToggleSwitch 声明 modelValue', ToggleSwitch.props?.modelValue != null);
    check('用例2 ToggleSwitch 声明 update:modelValue', ToggleSwitch.emits?.includes('update:modelValue'));

    const mount = document.createElement('div');
    document.body.appendChild(mount);
    createApp(FormDemo).mount(mount);

    const input = mount.querySelector('.text-field');
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    await nextTick();
    check('用例3 输入同步到 preview', mount.querySelector('.preview')?.textContent.includes('hello'));

    mount.querySelector('.toggle-btn')?.click();
    await nextTick();
    check('用例4 点击切换为开', mount.querySelector('.status')?.textContent.includes('开'));

    mount.querySelector('.toggle-btn')?.click();
    await nextTick();
    check('用例4 再点切换为关', mount.querySelector('.status')?.textContent.includes('关'));

    mount.remove();
  } catch (e) {
    errors.push('实现报错: ' + e.message);
  }

  return errors;
}

export function runConceptChecks(answers) {
  const errors = [];
  const expected = {
    q1: 'modelValue',
    q2: 'update:modelValue',
    q3: 'props+emit',
  };
  Object.entries(expected).forEach(([k, v]) => {
    if (!answers[k]) errors.push(`概念题 ${k} 未填写`);
    else if (answers[k] !== v) errors.push(`概念题 ${k} 错误`);
  });
  return errors;
}
