<script setup>
const title = import.meta.env.VITE_APP_TITLE;
const mode = import.meta.env.MODE;
const isDev = import.meta.env.DEV;
</script>

<template>
  <main class="page">
    <h1>{{ title }}</h1>
    <p class="tag" :class="isDev ? 'dev' : 'prod'">
      MODE = {{ mode }} · DEV = {{ isDev }}
    </p>

    <section class="card">
      <h2>实验说明</h2>
      <ol>
        <li><code>npm run dev</code> → 标题带 <strong>[DEV]</strong></li>
        <li>改本文件任意文字 → 保存 → 观察 HMR（不整页刷新）</li>
        <li><code>npm run build</code> + <code>npm run preview</code> → 标题带 <strong>[PROD]</strong></li>
      </ol>
    </section>

    <section class="card">
      <h2>环境变量</h2>
      <pre>VITE_APP_TITLE = {{ title }}</pre>
      <p class="hint">定义在 <code>.env.development</code> / <code>.env.production</code></p>
    </section>
  </main>
</template>
