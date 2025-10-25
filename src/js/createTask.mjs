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

    completeBtn.title = 'Отметить как выполненную';
    deleteBtn.title = 'Удалить задачу';

    // добавляем к элементу li дочерние элементы
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // возвращаем сформированную задачу вниз списка в родительский элемент
    todoList.appendChild(li);
};

export default createTasks;
