export default class toDoList {
    
    static tasks = [];
    

    static getTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    static getTasksByProject(projectId) {
        console.log(projectId, this.tasks);
        return this.tasks.filter(task => task.project && task.project.id === projectId);
    }

    static getAllTasks() {
        return this.tasks;
    }

    static setTask(task) {
        this.tasks.push(task);
    }

    static deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}