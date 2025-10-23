let nextId = 1;

class TasksStorage {
    constructor() {
        this.tasks = [];
    }

    addTask(text) {
        const task = { id: nextId++, text, completed: false };
        this.tasks.push(task);
        return task;
    }

    toggleTask(id) {
        return (this.completed = !this.completed);
    }

    deleteTask(id) {}

    load() {}

    getTasks() {}
}

export default TasksStorage;
