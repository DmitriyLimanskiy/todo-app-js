const STORAGE_KEY_ACTIVE = 'tasks';
const STORAGE_KEY_DELETED = 'deletedTask';

const storageService = {
    async load() {
        const tasks =
            JSON.parse(localStorage.getItem(STORAGE_KEY_ACTIVE)) || [];
        const deletedTasks =
            JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED)) || [];
        return { tasks, deletedTasks };
    },

    async save(tasks, deletedTask) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(tasks));
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(deletedTask));
    },
};

export default storageService;
