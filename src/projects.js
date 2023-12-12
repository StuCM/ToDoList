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

    getName() {
        return this.name;
    }
}

export class ProjectList {
    static projectsList = [];
    static defaultProjects = [
        {
            name:'All Tasks',
            icon: ['fa-solid', 'fa-inbox']
        }, 
        {
            name: 'Today',
            icon: ['fa-regular', 'fa-calendar']
        },
        {
            name: 'This Week',
            icon: ['fa-regular', 'fa-calendar-days']
        } 
    ];

    static getProject(name) {
        return this.projectsList.find(project => {
            return project.name === name ? project : null;
        });
    };

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