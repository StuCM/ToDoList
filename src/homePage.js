import Task from './Task.js';
import homePageController from './controllers/homePageController.js';

export default class homePage {

    static createHomePage() {
        const main = document.createElement('main');
        document.body.appendChild(main);
        main.classList.add('flex');

        const sidebar = document.createElement('div');
        main.appendChild(sidebar);
        sidebar.classList.add('sidebar');

        const logo = document.createElement('div');
        sidebar.appendChild(logo);
        sidebar.classList.add('logo');
        logo.innerText = 'To Do List';

        const line = document.createElement('hr');
        sidebar.appendChild(line);

        const toDoContainer = document.createElement('div')
        main.appendChild(toDoContainer);
        toDoContainer.classList.add('todo-container')

        const title = document.createElement('header');
        toDoContainer.appendChild(title);
        title.classList.add('title');
        title.innerHTML = 'ToDoList';

        const lineToDo = document.createElement('hr');
        toDoContainer.appendChild(lineToDo);
        lineToDo.classList.add('align-left');

        const toDoList = document.createElement('div');
        toDoContainer.appendChild(toDoList);
        toDoList.classList.add('todo-list');  
    }

    static createTaskHTML(task) {
        const container = document.createElement('div');
        container.classList.add('task-container');
        
        const taskColor = document.createElement('div');
        taskColor.classList.add('task-colour');
        container.appendChild(taskColor);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = task.getId();
        checkbox.name = task.getId();
        checkbox.classList.add('task-checkbox');
        container.appendChild(checkbox);

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');
        container.appendChild(taskInfo);

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.textContent = task.name;
        taskInfo.appendChild(taskName);

        const taskDueDate = document.createElement('div');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.textContent = task.dueDate;
        taskInfo.appendChild(taskDueDate);

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-description', 'hidden');
        taskDescription.textContent = task.description;
        taskInfo.appendChild(taskDescription);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        container.appendChild(buttonContainer);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        buttonContainer.appendChild(deleteButton);
        deleteButton.textContent = 'D';

        container.addEventListener('click', (event) => {
            homePageController.expandTask(event);
        });

        return container;
    }
}