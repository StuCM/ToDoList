export default class Task {
    static idCounter = 0;

    constructor(name, project, description, dueDate, priority) {
        this.id = ++Task.idCounter;
        this.name = name;
        this.project = project;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getId() {
        return this.id;
    }

    setName(name) {
        this.name = name;
    }

    setProject(project) {
        this.project = project;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}