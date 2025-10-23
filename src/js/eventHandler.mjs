import TasksStorage from './tasksStorage.mjs';

const eventHandler = (button) => {
    // найдем ближайший li с классом todo-item
    const listItem = button.closest('.todo-item');
    if (!listItem) return;

    if (button.classList.contains('delete-btn')) {
        listItem.remove(); // удалить задачу
    }

    if (button.classList.contains('complete-btn')) {
        listItem.classList.toggle('completed');
        
        // добавить класс выполнено, чтобы поменять стиль
    }
};

export default eventHandler;
