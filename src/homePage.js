import Task from './Task.js';
import toDoList from './toDoList.js';
import {ProjectList, Project} from './projects.js';
import addButton from './addButton.js';

export default class homePage {

    //HTML Creation

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

        const projectList = document.createElement('div');
        projectList.id = 'project-list';
        sidebar.appendChild(projectList);

        const addProjectButton = new addButton("small", "orange", () => homePage.addProject("MyProject"));
        sidebar.appendChild(addProjectButton.button);

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

        const taskButton = new addButton("large", "orange", () => homePage.openTaskModal());
        taskButton.button.classList.add('sticky');
        toDoContainer.appendChild(taskButton.button);
    }

    static createTaskHTML(task) {
        const container = document.createElement('div');
        container.classList.add('task-container');
        container.id = task.getId();
        
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
        deleteButton.classList.add('delete-button', 'fa-solid', 'fa-trash');
        buttonContainer.appendChild(deleteButton);
        deleteButton.textContent = 'D';

        container.addEventListener('click', (event) => {
            this.expandTask(event);
        });

        deleteButton.addEventListener('click', (event) => {
            this.deleteTask(event);
        });

        return container;
    }

    static createProjectHTML(project) {
        const container = document.createElement('div');
        container.classList.add('flex', 'project-container');
        container.id = project.getId();

        const projectColor = document.createElement('div');
        projectColor.classList.add('project-colour');
        container.appendChild(projectColor);

        const projectName = document.createElement('p');
        projectName.classList.add('project-name');
        projectName.textContent = project.name;
        container.appendChild(projectName);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button', 'project', 'fa-solid', 'fa-trash');
        container.appendChild(deleteButton);
        deleteButton.textContent = 'D';

        deleteButton.addEventListener('click', (event) => {
            this.deleteProject(event);
        });

        return container;
    }

    //Dom Actions

    static addTask(name, project, description, dueDate, priority) {
        const task = new Task(name, project, description, dueDate, priority);
        const taskHTML = homePage.createTaskHTML(task);
        const toDoListContainer = document.querySelector('.todo-list');
        toDoListContainer.appendChild(taskHTML);
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

    static deleteTask(event) {
        const task = event.currentTarget.closest('.task-container');
        const toDoListContainer = document.querySelector('.todo-list');
        toDoListContainer.removeChild(task);
        toDoList.deleteTask(task.id);
    }

    static addProject(name) {
        const project = new Project(name);
        const projectHTML = homePage.createProjectHTML(project);
        const container = document.querySelector('#project-list');
        container.appendChild(projectHTML);
    }

    static deleteProject(event) {
        const project = event.currentTarget.closest('.project-container');
        const projectList = document.querySelector('#project-list');
        projectList.removeChild(project);
        ProjectList.deleteProject(project.id);
    }

    static openTaskModal() {
        console.log('openTaskModal');
    }
}