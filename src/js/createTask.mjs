import storage from './tasksStorage.mjs';

// ===== функция для создания задач =====
const createTask = (task, todoList) => {
    // ===== создание задачи с элементами: =====
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('id', task.id);

    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.textContent = task.text;

    if (task.completed) li.classList.add('completed');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = '✅';
    completeBtn.title = 'Отметить как выполненную';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Удалить задачу';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = '✏️';
    editBtn.title = 'Редактировать задачу';

    const date = document.createElement('span');
    date.classList.add('todo-date');
    const dateObj = new Date(task.taskCreatedAt);
    date.textContent = dateObj.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    li.append(editBtn, span, completeBtn, deleteBtn, date);

    // ===== редактирование текста задач =====
    const enableEdit = () => {
        if (li.classList.contains('editing')) return;
        li.classList.add('editing');

        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        input.classList.add('edit-input');
        span.replaceWith(input);
        input.focus();

        const save = () => {
            const newText = input.value.trim();
            if (newText && newText !== task.text) {
                storage.updateTask(task.id, newText);
                task.text = newText;
            }
            input.replaceWith(span);
            span.textContent = task.text;
            li.classList.remove('editing');
        };

        input.addEventListener('blur', save);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') save();
        });
    };

    editBtn.addEventListener('click', enableEdit);
    span.addEventListener('dblclick', enableEdit);

    todoList.appendChild(li);
};

export default createTask;
