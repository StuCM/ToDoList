import { parseISO } from "date-fns";
import { parse } from "date-fns";
import { compareAsc } from "date-fns";

export default class toDoList {
    
    static tasks = [];
    

    static getTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    static getTasksByProject(projectId) {
        return this.tasks.filter(task => task.project && task.project.id === projectId);
    }

    static getTasksByDate(endDateString) {
        const endDate = new Date(endDateString);

        return this.tasks.filter(task => {
            const taskDate = parseISO(task.dueDate);
            return compareAsc(taskDate, endDate) <= 0;
        });
    }


    static getAllTasks() {
        return this.tasks;
    }

    static setTask(task) {
        this.tasks.push(task);
    }

    static deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== Number(id));
    }
}