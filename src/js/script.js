const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// обработка отправки формы
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // чтобы не перезагружать страницу

    const taskText = todoInput.value.trim(); // убираем пробелы в начале и в конце текста

    if (!taskText) {
        // проверка на пустую строку/null/undefind ввода
        return;
    }

    const li = document.createElement('li'); // создание нового элемента li
    li.classList.add('todo-item');

    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.textContent = taskText;

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = '✅';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '❌';

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    todoInput.value = ''; // очистка поля ввода
});

// обработчик событий при нажатии на завершить и удалить задачу
todoList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('delete-btn')) {
        target.parentElement.remove(); // удалить задачу
    }

    if (target.classList.contains('complete-btn')) {
        target.parentElement.classList.toggle('completed'); // пометить как выполненную
    }
});
