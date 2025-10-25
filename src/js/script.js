// app
import eventHandler from './eventHandler.mjs';
import createTasks from './createTasks.mjs';
import storage from './tasksStorage.mjs';

// записываем в переменные получаемые элементы
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// обработка отправки формы
todoForm.addEventListener('submit', (event) => {
    // убираем дефолтное действие, чтобы не перезагружать страницуы
    event.preventDefault();

    // записываем в переменную текст из поля ввода и убираем пробелы в начале и в конце текста
    const taskText = todoInput.value.trim();

    if (!taskText) {
        // проверка на пустую строку/null/undefind ввода
        return console.log('Пустая строка');
    }

    // записываем в переменную создание новой задачи
    const newTask = storage.addTask(taskText);

    // вызываем функцию для создания садач
    createTasks(newTask, todoList);

    // очистка поля ввода
    todoInput.value = '';
});

// обработчик событий при нажатии на завершить и удалить задачу
todoList.addEventListener('click', (event) => {
    // найдем элемент с классом кнопка
    const button = event.target.closest('button');
    // если элемента с классом кнопка нет, то завершаем работу программы
    if (!button) return;

    // вызываем функцию обработчик событий
    eventHandler(button);
});

// при запуске приложения — рендерим все сохранённые задачи
storage.getTasks().forEach((task) => createTasks(task, todoList));

export default storage;
