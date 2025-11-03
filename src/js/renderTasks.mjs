import createTask from './createTask.mjs';
import storage from './tasksStorage.mjs';

// ===== рендеринг задач с учетом фильтра и сортировки =====
const renderTasks = (todoList, currentFilter, currentSort) => {
    let tasks = storage.getFilteredTasks(currentFilter);
    tasks = storage.sortTasks(tasks, currentSort.type, currentSort.direction);

    todoList.innerHTML = '';
    tasks.forEach((task) => createTask(task, todoList));
};

export default renderTasks;
