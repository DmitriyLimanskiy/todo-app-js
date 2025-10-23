const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// обработка отправки формы
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // убираем дефолтное действие, чтобы не перезагружать страницу

    const taskText = todoInput.value.trim(); // убираем пробелы в начале и в конце текста

    if (!taskText) {
        // проверка на пустую строку/null/undefind ввода
        return;
    }

    const li = document.createElement('li'); // создание нового элемента li
    li.classList.add('todo-item'); // добавляем к элементу li класс

    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.textContent = taskText;

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = '✅';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '❌';

    // добавляем к элементу li детей
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    todoInput.value = ''; // очистка поля ввода
});

// обработчик событий при нажатии на завершить и удалить задачу
todoList.addEventListener('click', (event) => {
    // найдем элемент с классом кнопка
    const button = event.target.closest('button');
    if (!button) return;

    // найдем ближайший li с классом todo-item
    const listItem = button.closest('.todo-item');
    if (!listItem) return;

    console.log('Кликнули по', event.target);
    console.log('button:', button);
    console.log('listItem:', listItem);

    if (button.classList.contains('delete-btn')) {
        listItem.remove(); // удалить задачу
    }

    if (button.classList.contains('complete-btn')) {
        listItem.classList.toggle('completed');
        // добавить класс выполнено, чтобы поменять стиль
    }
});
