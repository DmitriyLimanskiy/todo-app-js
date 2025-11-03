import eventHandler from './eventHandler.mjs';
import storage from './tasksStorage.mjs';
import renderTasks from './renderTasks.mjs';

// ===== DOM-элементы =====
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.todo-filter button');
const filterCounter = document.querySelector('.todo-tasks-counter');
const sortByNameBtn = document.getElementById('sort-name');
const sortByDateBtn = document.getElementById('sort-date');

// ===== Состояния =====
let currentFilter = 'all';
let currentSort = { type: null, direction: null };

// ===== Первый рендер =====
renderTasks(todoList, currentFilter, currentSort);
filterCounter.textContent = `Всего задач: ${storage.tasks.length}`;

// ===== Добавление задачи =====
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    storage.addTask(taskText);
    renderTasks(todoList, currentFilter, currentSort);
    todoInput.value = '';
    filterCounter.textContent = `Всего задач: ${storage.getCount(currentFilter)}`;
});

// ===== Завершение / удаление =====
todoList.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    eventHandler(button);
    renderTasks(todoList, currentFilter, currentSort);
    filterCounter.textContent = `Всего задач: ${storage.getCount(currentFilter)}`;
});

// ===== Фильтрация =====
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        currentFilter = button.dataset.filter;
        renderTasks(todoList, currentFilter, currentSort);
        filterCounter.textContent = `Всего задач: ${storage.getCount(currentFilter)}`;
    });
});

// ===== Сортировка =====
function toggleSort(type) {
    if (currentSort.type !== type) {
        currentSort = { type, direction: 'asc' };
    } else if (currentSort.direction === 'asc') {
        currentSort.direction = 'desc';
    } else if (currentSort.direction === 'desc') {
        currentSort = { type: null, direction: null }; // сброс
    }

    // визуальное состояние кнопок
    sortByNameBtn.classList.toggle('active', currentSort.type === 'name');
    sortByDateBtn.classList.toggle('active', currentSort.type === 'date');

    renderTasks(todoList, currentFilter, currentSort);
}

sortByNameBtn.addEventListener('click', () => toggleSort('name'));
sortByDateBtn.addEventListener('click', () => toggleSort('date'));
