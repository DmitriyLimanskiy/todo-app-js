// app
import eventHandler from './eventHandler.mjs';
import createTasks from './createTask.mjs';
import storage from './tasksStorage.mjs';
import renderTasks from './filter.mjs';

// записываем в переменные получаемые элементы
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const filterButtons = document.querySelectorAll('.todo-filter button');
const filterCounter = document.querySelector('.todo-tasks-countet');

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

// фильтрация задач: все, активные, выполненные
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter; // 'all' 'active' 'completed'
        const filteredTasks = storage.getFilteredTasks(filter);
        renderTasks(filteredTasks, todoList);

        // счетчик задач
        const counterTasks = filteredTasks.length;
        console.log(counterTasks);
        filterCounter.innerHTML = `Всего задач: ${counterTasks}`;
    });
});

// значение фильтра по умолчанию равно общему колмчеству задач
filterCounter.innerHTML = `Всего задач: ${storage.tasks.length}`;
