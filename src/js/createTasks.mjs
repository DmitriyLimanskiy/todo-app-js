const createTasks = (taskText, todoList) => {
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
};

export default createTasks;
