import createTask from './createTask.mjs';
import storage from './tasksStorage.mjs';

// ===== рендеринг задач с учетом фильтра и сортировки =====
const renderTasks = (todoList, currentFilter, currentSort) => {
    // ===== Основные задачи =====
    let tasks = storage.getFilteredTasks(currentFilter);
    tasks = storage.sortTasks(tasks, currentSort.type, currentSort.direction);

    todoList.innerHTML = '';
    tasks.forEach((task) => createTask(task, todoList));

    // ===== Корзина =====
    const deletedList = document.getElementById('deleted-list');
    if (deletedList) {
        deletedList.innerHTML = '';

        storage.deletedTasks.forEach((task) => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.id = task.id;
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="restore-btn">♻️</button>
                <button class="permanent-delete-btn">❌</button>
            `;
            deletedList.append(li);
        });
    }
};

export default renderTasks;
