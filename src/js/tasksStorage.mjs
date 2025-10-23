let nextId = 0;

class TasksStorage {
    constructor() {
        this.tasks = [];
    }

    addTask(text) {
        const task = { id: ++nextId, text, completed: false };
        this.tasks.push(task);
        return task;
    }

    toggleTask(id) {}

    deleteTask(id) {}

    load() {}

    getTasks() {}
}

export default TasksStorage;
