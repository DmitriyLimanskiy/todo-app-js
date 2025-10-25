let nextId = 0;

class TasksStorage {
    constructor() {
        // загрузка задач при старте
        this.tasks = this.load();

        // вычислим id для новых задач (чтобы не дублировать)
        if (this.tasks.length > 0) {
            nextId = Math.max(...this.tasks.map((t) => t.id));
        }
    }

    // добавление в массив объекта с уникаьным id и текста из поля ввода
    addTask(text) {
        const newTask = { id: ++nextId, text, completed: false };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }

    // сохранение состояни (выполенена, не выполнена) задачи
    toggleTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save();
        }
    }

    // удаляем из массива удаленную задачу
    deleteTask(id) {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.save();
    }

    // сохраняем массив в локальное хранилище при этом превращая массив в строку
    save() {
        console.log('💾 Сохраняем задачи:', this.tasks);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // загрузка данных из локального хранилища и парсинга строки в json
    load() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }

    // получение задач из массива
    getTasks() {
        return this.tasks;
    }
}

const storage = new TasksStorage();

export default storage;

/*
localStorage — это встроенное в браузер хранилище.

Работает как “мини-база данных” прямо у пользователя.

Хранит данные в формате строк (string), и не стирается после перезагрузки.

Методы:

localStorage.setItem('ключ', 'значение'); // сохранить
localStorage.getItem('ключ'); // получить
localStorage.removeItem('ключ'); // удалить


Так как localStorage умеет хранить только строки, объекты и массивы нужно сериализовать:

const json = JSON.stringify(tasks); // объект → строка
const tasks = JSON.parse(json);     // строка → объект
*/
