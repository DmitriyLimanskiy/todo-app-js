import storage from './tasksStorage.mjs';

const eventHandler = (button) => {
    // найдем ближайший li с классом todo-item
    const li = button.closest('.todo-item');
    // получим значение id элемента в переменную
    const id = Number(li.getAttribute('id'));
    // защита от ошибок
    if (!id) return;

    if (button.classList.contains('delete-btn')) {
        storage.deleteTask(id);
        // удалить задачу
        li.remove();
    }

    if (button.classList.contains('complete-btn')) {
        const li = button.closest('li');
        const id = parseInt(li.id, 10);
        storage.toggleTask(id);
        // визуальное изменение
        li.classList.toggle('completed');
    }
};

export default eventHandler;
