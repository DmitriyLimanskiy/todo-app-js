import storageService from './storageServies.mjs';

let nextId = 0;

class TasksStorage {
    // ===== конструктор который создает массив с объектами(задачами) =====
    constructor() {
        this.tasks = [];
        this.deletedTasks = [];
    }

    async init() {
        const { tasks, deletedTasks } = await storageService.load();
        this.tasks = tasks;
        this.deletedTasks = deletedTasks;

        if (this.tasks.length > 0) {
            nextId = Math.max(...this.tasks.map((t) => t.id));
        }

        // добавляем дату, если её нет
        [...this.tasks, ...this.deletedTasks].forEach((t) => {
            if (!t.taskCreatedAt) {
                t.taskCreatedAt = new Date().toISOString();
            }
        });

        await storageService.save(this.tasks, this.deletedTasks);
    }

    // ===== метод для добавления задач =====
    async addTask(text) {
        const newTask = {
            id: ++nextId,
            text,
            completed: false,
            taskCreatedAt: new Date().toISOString(),
        };
        this.tasks.push(newTask);
        await storageService.save(this.tasks);
        return newTask;
    }

    // ===== метод для переключения состояния задач (завершена или нет) =====
    async toggleTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            await storageService.save(this.tasks);
        }
    }

    // ===== метод для удаления задач =====
    async deleteTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) return;

        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.deletedTasks.push(task);
        console.log(this.deletedTasks);
        await storageService.save(this.tasks, this.deletedTasks);
    }

    // ===== метод для восстановления задачи из корзины =====
    async restoreTask(id) {
        const task = this.deletedTasks.find((t) => t.id === id);
        if (!task) return;

        this.deletedTasks = this.deletedTasks.filter((t) => t.id !== id);
        this.tasks.push(task);
        await storageService.save(this.tasks, this.deletedTasks);
    }

    // ===== метод для удаления задачи из корзины =====
    async permanentlyDeleteTask(id) {
        this.deletedTasks = this.deletedTasks.filter((t) => t.id !== id);
        await storageService.save(this.tasks, this.deletedTasks);
    }

    // ===== метод для изменения текста в задаче =====
    async updateTask(id, newText) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.text = newText;
            await storageService.save(this.tasks);
        }
    }

    // ===== метод для фильтрации задач =====
    getFilteredTasks(filter) {
        if (filter === 'active') return this.tasks.filter((t) => !t.completed);
        if (filter === 'completed')
            return this.tasks.filter((t) => t.completed);
        return this.tasks;
    }

    // ===== метод для сортировки задач =====
    sortTasks(tasks, type, direction) {
        if (!type || !direction) return [...tasks];

        const sorted = [...tasks];
        if (type === 'name') {
            sorted.sort((a, b) => {
                const nameA = a.text.toLowerCase();
                const nameB = b.text.toLowerCase();
                if (nameA < nameB) return direction === 'asc' ? -1 : 1;
                if (nameA > nameB) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        if (type === 'date') {
            sorted.sort((a, b) => {
                const dateA = new Date(a.taskCreatedAt);
                const dateB = new Date(b.taskCreatedAt);
                return direction === 'asc' ? dateA - dateB : dateB - dateA;
            });
        }

        return sorted;
    }

    // ===== метод для подсчета количества задач =====
    getCount(filter = 'all') {
        return this.getFilteredTasks(filter).length;
    }
}

const storage = new TasksStorage();
export default storage;
