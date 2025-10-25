// app
import eventHandler from './eventHandler.mjs';
import createTasks from './createTasks.mjs';
import storage from './tasksStorage.mjs';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// обработка отправки формы
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // убираем дефолтное действие, чтобы не перезагружать страницу

    const taskText = todoInput.value.trim(); // записываем в переменную текст из поля ввода и убираем пробелы в начале и в конце текста
    console.log(taskText);

    if (!taskText) {
        // проверка на пустую строку/null/undefind ввода
        return console.log('Пустая строка');
    }

    const newTask = storage.addTask(taskText);

    createTasks(newTask, todoList); // вызываем функцию для создания садач

    todoInput.value = ''; // очистка поля ввода
});

// обработчик событий при нажатии на завершить и удалить задачу
todoList.addEventListener('click', (event) => {
    // найдем элемент с классом кнопка
    const button = event.target.closest('button');
    if (!button) return;

    eventHandler(button);
});

// при запуске приложения — рендерим все сохранённые задачи
storage.getTasks().forEach((task) => createTasks(task, todoList));

export default storage;
