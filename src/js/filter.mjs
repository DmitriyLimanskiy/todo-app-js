import createTasks from './createTask.mjs';

const renderTasks = (tasksArray, todoList) => {
    // очищаем ul
    todoList.innerHTML = '';

    // создаем li для каждой задачи
    tasksArray.forEach((task) => createTasks(task, todoList));
};

export default renderTasks;
