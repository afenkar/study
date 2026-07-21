/**
 * Day 27 · 页面组件
 */
import { defineComponent } from 'vue';

export const HomePage = defineComponent({
  name: 'HomePage',
  template: `<p class="page home">首页内容</p>`,
});

export const AboutPage = defineComponent({
  name: 'AboutPage',
  template: `<p class="page about">关于页面</p>`,
});

export const AppShell = defineComponent({
  name: 'AppShell',
  template: `
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <main class="main"><router-view /></main>
  `,
});
