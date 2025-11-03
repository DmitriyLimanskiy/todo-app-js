let nextId = 0;

class TasksStorage {
    // ===== конструктор который создает массив с объектами(задачами) =====
    constructor() {
        this.tasks = this.load();
        if (this.tasks.length > 0) {
            nextId = Math.max(...this.tasks.map((t) => t.id));
        }
    }

    // ===== метод для добавления задач =====
    addTask(text) {
        const newTask = {
            id: ++nextId,
            text,
            completed: false,
            taskCreatedAt: new Date().toISOString(),
        };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }

    // ===== метод для переключения состояния задач (завершена или нет) =====
    toggleTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save();
        }
    }

    // ===== метод для удаления задач =====
    deleteTask(id) {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.save();
    }

    // ===== метод для текста в задаче =====
    updateTask(id, newText) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.text = newText;
            this.save();
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

    // ===== метод для сохранения задач в local storage =====
    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // ===== метод для загрузки задач из local storage =====
    load() {
        const saved = localStorage.getItem('tasks');
        const tasks = saved ? JSON.parse(saved) : [];

        tasks.forEach((t) => {
            if (!t.taskCreatedAt) t.taskCreatedAt = new Date().toISOString();
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        return tasks;
    }
}

const storage = new TasksStorage();
export default storage;
