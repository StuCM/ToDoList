export class Project {
    static idCounter = 0;

    constructor(name) {
        this.name = name;
        this.id = Project.idCounter++;

        ProjectList.setProject(this);
    }

    getId() {
        return this.id;
    }
}

export class ProjectList {
    static projectsList = [];

    static getProject(name) {
        return this.projectsList.find(project => project.name === name);
    }

    static getAllProjects() {
        return this.projectsList;
    }

    static setProject(project) {
        this.projectsList.push(project);
    }

    static deleteProject(id) {
        this.projectsList = this.projectsList.filter(project => project.id !== id);
    }
}