// app
import eventHandler from './eventHandler.mjs';
import createTasks from './createTasks.mjs';
import TasksStorage from './tasksStorage.mjs';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const storage = new TasksStorage();

// обработка отправки формы
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // убираем дефолтное действие, чтобы не перезагружать страницу

    const taskText = todoInput.value.trim(); // убираем пробелы в начале и в конце текста

    if (!taskText) {
        // проверка на пустую строку/null/undefind ввода
        return;
    }

    createTasks(taskText, todoList); // вызываем функцию для создания садач

    todoInput.value = ''; // очистка поля ввода

    // локальное хранилище задач
});

// обработчик событий при нажатии на завершить и удалить задачу
todoList.addEventListener('click', (event) => {
    // найдем элемент с классом кнопка
    const button = event.target.closest('button');
    if (!button) return;

    eventHandler(button);
});

// storage.getTasks().forEach(renderTask);

// todoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const task = storage.addTask(input.value);
//     renderTask(task);
// });
