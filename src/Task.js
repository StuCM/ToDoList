export class task {
    constructor(id, name, project, description, dueDate, priority) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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