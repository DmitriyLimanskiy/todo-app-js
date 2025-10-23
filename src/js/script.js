// app

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
    li.textContent = taskText; // вставляем текст в новый элемент li

    todoList.appendChild(li);
    todoInput.value = ''; // очистка поля ввода
});
