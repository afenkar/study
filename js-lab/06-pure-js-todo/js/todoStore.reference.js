/**
 * 参考答案 — 做完后再对照，不要直接抄
 */
export function createTodoStoreReference() {
  let todos = [];
  let filter = 'all';
  const STORAGE_KEY = 'study-todo-list';

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos = raw ? JSON.parse(raw) : [];
  }

  return {
    init() { load(); },
    getFilter() { return filter; },
    setFilter(next) { filter = next; },
    getAll() { return [...todos]; },

    add(text) {
      const trimmed = text.trim();
      if (!trimmed) return;
      todos.push({ id: Date.now(), text: trimmed, completed: false });
      save();
    },

    toggle(id) {
      const item = todos.find((t) => t.id === id);
      if (item) item.completed = !item.completed;
      save();
    },

    remove(id) {
      todos = todos.filter((t) => t.id !== id);
      save();
    },

    clearCompleted() {
      todos = todos.filter((t) => !t.completed);
      save();
    },

    getActiveCount() {
      return todos.filter((t) => !t.completed).length;
    },

    getFilteredTodos() {
      if (filter === 'active') return todos.filter((t) => !t.completed);
      if (filter === 'completed') return todos.filter((t) => t.completed);
      return todos;
    },
  };
}
