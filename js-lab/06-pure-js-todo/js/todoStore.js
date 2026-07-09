/**
 * TodoStore — 用闭包管理私有状态
 * Day 6 练习：完成标记 TODO 的 5 个方法
 */

const STORAGE_KEY = 'study-todo-list';

export function createTodoStore() {
  let todos = [];       // 私有数据，外部不能直接改
  let filter = 'all';   // all | active | completed

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos = raw ? JSON.parse(raw) : [];
  }

  function getFilteredTodos() {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }

  return {
    init() {
      load();
    },

    getFilter() {
      return filter;
    },

    setFilter(next) {
      filter = next;
    },

    getAll() {
      return [...todos];
    },

    add(text) {
      const trimmed = text.trim();
      if (!trimmed) return;
      todos.push({
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      });
      save();
    },

    toggle(id) {
      // TODO 2: 找到对应 id，切换 completed，save()
      // todos.forEach((t) => {
      //     if(t.id==id){
      //       t.completed=!t.completed
      //     }
      // })
      let todo=todos.find((t)=>t.id===id)
      if(todo){
        todo.completed = !todo.completed
      }
      save()
    },

    remove(id) {
      // TODO 3: 删除对应 id，save()
      todos = todos.filter((t) => t.id!=id)
      save()
    },

    clearCompleted() {
      // TODO 4: 过滤掉 completed 为 true 的项，save()
      todos = todos.filter((t) => !t.completed)
      save()
    },

    getActiveCount() {
      // TODO 5: 返回未完成数量
      // let count = 0
      // todos.forEach((item)=>{
      //   if(!item.completed){
      //       count++;
      //   }
      // })
      // return count;
      return todos.filter(t=>!t.completed).length
    },

    getFilteredTodos,
  };
}
