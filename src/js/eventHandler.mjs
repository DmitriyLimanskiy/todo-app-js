import storage from './tasksStorage.mjs';

// ===== функция для отслеживания нажатий на complete и delete =====
const eventHandler = (button) => {
    const li = button.closest('.todo-item');
    const id = Number(li?.id);
    if (!id) return;

    if (button.classList.contains('delete-btn')) {
        storage.deleteTask(id);
        li.remove();
    }

    if (button.classList.contains('complete-btn')) {
        storage.toggleTask(id);
        li.classList.toggle('completed');
    }
};

export default eventHandler;
