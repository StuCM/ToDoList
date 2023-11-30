import Task from "../Task";
import homePage from "../homePage";

export default class homePageController {

    static addTask(name, project, description, dueDate, priority) {
        const task = new Task(name, project, description, dueDate, priority);
        const taskHTML = homePage.createTaskHTML(task);
        const toDoList = document.querySelector('.todo-list');
        toDoList.appendChild(taskHTML);
    }

    static expandTask(event) {
        const task = event.currentTarget;
        const taskDescription = task.querySelector('.task-description');
        if(['INPUT','BUTTON'].includes(event.target.tagName)) {
            event.stopPropagation();
            return;
        }
        taskDescription.classList.toggle('hidden');
    }
}