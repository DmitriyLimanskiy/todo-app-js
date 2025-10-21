const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // чтобы не перезагружать страницу

    const taskText = input.value.trim(); // убираем пробелы вначале и в конце текста

    if (taskText === '') {
        // проверка на пустую строку ввода
        return;
    }

    const li = document.createElement('li'); // создание нового элемента li
    li.textContent = taskText; // вставляем текст в новый элемент li

    list.appendChild(li);
    input.value = ''; // очистка поля ввода
});
