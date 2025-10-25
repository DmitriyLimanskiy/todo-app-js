import storage from './tasksStorage.mjs';

const eventHandler = (button) => {
    // найдем ближайший li с классом todo-item
    const li = button.closest('.todo-item');
    // получим значение id элемента в переменную
    const id = Number(li.getAttribute('id'));

    if (button.classList.contains('delete-btn')) {
        storage.deleteTask(id);
        li.remove(); // удалить задачу
    }

    if (button.classList.contains('complete-btn')) {
        storage.toggleTask(id);
        li.classList.toggle('completed');
        // добавить класс выполнено, чтобы поменять стиль
    }
};

export default eventHandler;
