import storage from './tasksStorage.mjs';

// ===== функция для отслеживания нажатий на кнопки задач =====
const eventHandler = async (button) => {
    const li = button.closest('.todo-item');
    const id = Number(li?.id);
    if (!id) return;

    if (button.classList.contains('delete-btn')) {
        await storage.deleteTask(id);
    } else if (button.classList.contains('restore-btn')) {
        await storage.restoreTask(id);
    } else if (button.classList.contains('permanent-delete-btn')) {
        await storage.permanentlyDeleteTask(id);
    } else if (button.classList.contains('toggle-btn')) {
        await storage.toggleTask(id);
    }

    if (button.classList.contains('complete-btn')) {
        storage.toggleTask(id);
        li.classList.toggle('completed');
    }
};

export default eventHandler;
