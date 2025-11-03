const STORAGE_KEY_ACTIVE = 'tasks';
const STORAGE_KEY_DELETED = 'deletedTasks';

const storageService = {
    async load() {
        let tasks = [];
        let deletedTasks = [];

        try {
            const rawTasks = localStorage.getItem(STORAGE_KEY_ACTIVE);
            const rawDeleted = localStorage.getItem(STORAGE_KEY_DELETED);

            // защищаемся от "undefined" и невалидного JSON
            tasks =
                rawTasks && rawTasks !== 'undefined'
                    ? JSON.parse(rawTasks)
                    : [];
            deletedTasks =
                rawDeleted && rawDeleted !== 'undefined'
                    ? JSON.parse(rawDeleted)
                    : [];
        } catch (e) {
            console.warn('Ошибка при загрузке задач:', e);
        }

        return { tasks, deletedTasks };
    },

    async save(tasks, deletedTasks) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(tasks));
        localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(deletedTasks));
    },
};

export default storageService;
