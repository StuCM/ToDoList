import toDoList from "./toDoList";
import { ProjectList } from "./projects";

export default class Task {
    static idCounter = 0;

    constructor(name, project, description, dueDate, priority) {
        this.id = ++Task.idCounter;
        this.name = name;
        this.project = this.setProject(project);
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        toDoList.setTask(this);
    }

    getId() {
        return this.id;
    }

    setName(name) {
        this.name = name;
    }

    setProject(project) {
        const projectList = ProjectList.getProject(project);
        if (project) {
            return project;
        }
        console.log("Project does not exist");
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
}