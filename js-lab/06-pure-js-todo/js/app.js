/**
 * 应用入口 — 连接 store 和 UI
 * 完成 todoStore.js 的 TODO 后，此文件即可运行
 */

import { createTodoStore } from './todoStore.js';
import { renderList, renderCount, renderFilterButtons } from './render.js';

const store = createTodoStore();
store.init();

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const listEl = document.getElementById('todo-list');
const countEl = document.getElementById('todo-count');
const filterBox = document.querySelector('.filters');
const clearBtn = document.getElementById('clear-completed');

function refresh() {
  renderList(listEl, store.getFilteredTodos(), {
    onToggle: (id) => {
      store.toggle(id);
      refresh();
    },
    onRemove: (id) => {
      store.remove(id);
      refresh();
    },
  });
  renderCount(countEl, store.getActiveCount());
  renderFilterButtons(filterBox, store.getFilter(), (f) => {
    store.setFilter(f);
    refresh();
  });
}

form.addEventListener('submit', (e) => { 
  e.preventDefault();
  store.add(input.value);
  input.value = '';
  refresh();
});

clearBtn.addEventListener('click', () => {
  store.clearCompleted();
  refresh();
});

refresh();
