import storage from './tasksStorage.mjs';

const createTasks = (task, todoList) => {
    // создание нового элемента li
    const li = document.createElement('li');
    // добавляем к элементу li класс
    li.classList.add('todo-item');
    // добавляем к элементу li уникальный id
    li.setAttribute('id', task.id);

    // создаем элемент с текстом задачи
    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.textContent = task.text;

    // если у задачи в локальном хранилище класс completed, то добавляем к элементу li класс completed
    if (task.completed) {
        li.classList.add('completed');
    }

    // добавляем значек галочки к задаче и присваеваем класс complete-btn
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = '✅';

    // добавляем значек крестика к задаче и присваеваем класс delete-btn
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '❌';

    // кнопка редактирования
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = '✏️';

    completeBtn.title = 'Отметить как выполненную';
    deleteBtn.title = 'Удалить задачу';

    // добавляем к элементу li дочерние элементы
    li.appendChild(editBtn);
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // возвращаем сформированную задачу вниз списка в родительский элемент
    todoList.appendChild(li);

    // редактирование текста
    const enableEdit = () => {
        // чтобы нельзя было редактировать две сразуы
        if (li.classList.contains('editing')) return;
        li.classList.add('editing');

        // создаем input
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        input.classList.add('edit-input');
        span.replaceWith(input);
        input.focus();

        // чтобы save сработал только один раз
        let saved = false;

        // при потере фокуса или Enter — сохраняем
        const save = () => {
            // если уже сохранили — выходим
            if (saved) return;
            saved = true;

            const newText = input.value.trim();

            if (newText && newText !== task.text) {
                task.text = newText;
                storage.updateTask(task.id, newText);
                span.textContent = task.text;
            }

            input.replaceWith(span);
            li.classList.remove('editing');
        };

        // слушатель
        input.addEventListener('blur', save);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') save();
        });
    };

    editBtn.addEventListener('click', enableEdit);
    span.addEventListener('dblclick', enableEdit);
};

export default createTasks;
