import toDoList from "./toDoList";
import { ProjectList } from "./projects";

export default class Task {
    static idCounter = 0;

    constructor(name, project, description, dueDate, priority = 0, checked = false) {
        this.id = 'task-' + ++Task.idCounter;
        this.name = name;
        this.project = this.setProject(project);
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;

        toDoList.setTask(this);
    }

    getId() {
        return this.id;
    }

    setName(name) {
        this.name = name;
    }

    setProject(projectName) {
        const project = ProjectList.getProject(projectName);
        if (project) {
            this.project = project;
        }
        else {
            console.log("Project does not exist");
        }
        return this.project;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}