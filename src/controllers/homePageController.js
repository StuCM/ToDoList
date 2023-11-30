import Task from "../Task";
import homePage from "../homePage";

export default class homePageController {

    static addTask(name, project, description, dueDate, priority) {
        const task = new Task(name, project, description, dueDate, priority);
        const taskHTML = homePage.createTaskHTML(task);
        const toDoList = document.querySelector('.todo-list');
        toDoList.appendChild(taskHTML);
    }
}