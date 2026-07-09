/**
 * 渲染模块 — 只负责 DOM，不直接改数据
 */

export function renderList(listEl, todos, { onToggle, onRemove }) {
  listEl.innerHTML = '';

  if (todos.length === 0) {
    listEl.innerHTML = '<li class="empty">暂无待办，添加一条吧</li>';
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} />
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button type="button" class="delete-btn">删除</button>
    `;

    li.querySelector('input').addEventListener('change', () => onToggle(todo.id));
    li.querySelector('.delete-btn').addEventListener('click', () => onRemove(todo.id));

    listEl.appendChild(li);
  });
}

export function renderCount(countEl, n) {
  countEl.textContent = `${n} 项待办`;
}

export function renderFilterButtons(container, current, onChange) {
  container.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === current);
    btn.onclick = () => onChange(btn.dataset.filter);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
