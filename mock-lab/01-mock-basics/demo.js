const statusEl = document.getElementById('status');
const listEl = document.getElementById('list');

async function loadUsers(url, label) {
  statusEl.textContent = `请求中：${label}…`;
  listEl.innerHTML = '';

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (json.code !== 0) {
      statusEl.textContent = `Mock 返回 code=${json.code}：${json.message}`;
      return;
    }

    statusEl.textContent = `✅ Mock 成功（${label}），共 ${json.data.length} 条`;
    listEl.innerHTML = json.data
      .map(
        (u) =>
          `<li><strong>${u.name}</strong> <span class="tag">${u.role}</span> · id=${u.id}</li>`,
      )
      .join('');
  } catch (err) {
    statusEl.textContent = `❌ 请求失败：${err.message}（是否用 Live Server 打开？）`;
  }
}

document.getElementById('btn-ok').addEventListener('click', () => {
  loadUsers('./data/users.json', 'users.json');
});

document.getElementById('btn-empty').addEventListener('click', () => {
  loadUsers('./data/users-empty.json', '401 mock');
});
