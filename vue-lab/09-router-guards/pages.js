/**
 * Day 28 · 页面组件
 */
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export const HomePage = defineComponent({
  name: 'HomePage',
  template: `<p class="page home">首页（公开）</p>`,
});

export const UserPage = defineComponent({
  name: 'UserPage',
  setup() {
    const route = useRoute();
    return { userId: route.params.id };
  },
  template: `<p class="page user">用户 ID：{{ userId }}</p>`,
});

export const AdminPage = defineComponent({
  name: 'AdminPage',
  template: `<p class="page admin">管理后台（需登录）</p>`,
});

export const AppShell = defineComponent({
  name: 'AppShell',
  props: { loggedIn: Boolean },
  emits: ['toggle-login'],
  template: `
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/user/42">用户42</router-link>
      <router-link to="/admin">后台</router-link>
      <button class="login-btn" @click="$emit('toggle-login')">
        {{ loggedIn ? '退出' : '登录' }}
      </button>
    </nav>
    <main class="main"><router-view /></main>
  `,
});
