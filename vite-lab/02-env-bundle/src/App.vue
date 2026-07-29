<script setup>
import { ref, defineAsyncComponent } from 'vue';

const apiBase = import.meta.env.VITE_API_BASE;
const appName = import.meta.env.VITE_APP_NAME;
const mode = import.meta.env.MODE;
const dbPassword = import.meta.env.DB_PASSWORD;

const showHeavy = ref(false);
const HeavyPanel = defineAsyncComponent(() =>
  import('./components/HeavyPanel.vue'),
);
</script>

<template>
  <main class="page">
    <h1>Day 38 · 环境变量 + 打包</h1>

    <section class="card">
      <h2>实验 A · 环境变量</h2>
      <table class="env-table">
        <tbody>
          <tr>
            <th>VITE_APP_NAME</th>
            <td><code>{{ appName }}</code></td>
          </tr>
          <tr>
            <th>VITE_API_BASE</th>
            <td><code>{{ apiBase }}</code></td>
          </tr>
          <tr>
            <th>MODE</th>
            <td><code>{{ mode }}</code></td>
          </tr>
          <tr>
            <th>DB_PASSWORD（无 VITE_）</th>
            <td>
              <code>{{ dbPassword ?? 'undefined（未暴露给前端）' }}</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="hint">
        改 API：编辑 <code>.env.local</code> 或 <code>.env.development.local</code>，保存后 <strong>必须 Ctrl+C 重启 npm run dev</strong>（热更新不会刷新 env）。
      </p>
    </section>

    <section class="card">
      <h2>实验 B · 动态 import 拆包</h2>
      <p>
        执行 <code>npm run build</code>，在终端和 <code>dist/assets/</code> 里找
        <strong>2 个 .js</strong>：<code>index-xxxxx.js</code>（主包）+
        <code>HeavyPanel-xxxxx.js</code>（拆包）。
      </p>
      <p class="hint">
        ⚠️ dev 里<strong>点不点按钮不影响 build</strong>——代码里写了
        <code>import('./components/HeavyPanel.vue')</code>，打包时就会拆 chunk。
        下面按钮只是运行时「按需加载」演示。
      </p>
      <button type="button" @click="showHeavy = true">加载重型面板（dev 演示）</button>
      <HeavyPanel v-if="showHeavy" />
    </section>
  </main>
</template>
