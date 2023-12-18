import Task from './Task.js';
import toDoList from './toDoList.js';
import {ProjectList, Project} from './projects.js';
import addButton from './addButton.js';
import Modal from './modal.js';
import { format, nextSunday } from 'date-fns';
import { getDay } from 'date-fns';

export default class homePage {
    static modal = new Modal();
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

        const defaultProjectContainer = document.createElement('div');
        defaultProjectContainer.classList.add('default');
        projectList.appendChild(defaultProjectContainer);

        ProjectList.defaultProjects.forEach(project => homePage.createDefaultProjects(project.name, project.icon));

        const addProjectButton = new addButton("small", "orange", () => homePage.openProjectModal());
        sidebar.appendChild(addProjectButton.button);

        main.appendChild(this.modal.modal);

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

        checkbox.addEventListener('change', (event) => {
            this.toggleComplete(event);
        })

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

        const editButton = document.createElement('a');
        editButton.classList.add('delete-button', 'fa-solid', 'fa-edit');
        editButton.id = 'edit-button';

        const deleteButton = document.createElement('a');
        deleteButton.classList.add('delete-button', 'fa-solid', 'fa-trash');
        deleteButton.id = 'delete-button';
        buttonContainer.append(editButton, deleteButton);

        container.addEventListener('click', (event) => {
            const target = event.target.closest('[id]');

            switch(target.id) {
                case 'delete-button':
                    this.deleteTask(event);
                    break;
                case 'edit-button':
                    homePage.editTask(event);
                    break;
                default:
                    if (event.target.classList.contains('task-container')){
                     this.expandTask(event);
                    }
                    break;
            }        
        });


        return container;
    }

    static editTaskContainer(id) {
        const taskContainer = document.querySelector(`#${id}`);
        const task = toDoList.getTask(id);
        const taskName = taskContainer.querySelector('.task-name');
        const taskDescription = taskContainer.querySelector('.task-description');
        const taskDueDate = taskContainer.querySelector('.task-due-date');

        taskName.textContent = task.name;
        taskDescription.textContent = task.description;
        taskDueDate.textContent = task.dueDate;
    }

    static createDefaultProjects(project, icon) {   
        const defaultContainer = document.querySelector('.default');
        const container = document.createElement('div');
        container.classList.add('flex', 'project-container', 'default');
        container.id = project;
        
        const iconContainer = document.createElement('span');

        icon.forEach(icon => {
            iconContainer.classList.add(icon, 'project', 'project-icon');
        });

        const projectName = document.createElement('span');
        projectName.classList.add('project-name');
        projectName.textContent = project;

        container.append(iconContainer, projectName);

        projectName.addEventListener('click', (event) => {
            homePage.selectDefaultProject(event);
        });
        defaultContainer.appendChild(container);
    }

    static createProjectHTML(project) {
        const container = document.createElement('div');
        container.classList.add('flex', 'project-container');
        container.id = project.getId();

        const colourContainer = document.createElement('div');
        colourContainer.classList.add('project-colour');

        const projectName = document.createElement('span');
        projectName.classList.add('project-name');
        projectName.textContent = project.name;
        container.append(colourContainer, projectName);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const editButton = document.createElement('a');
        editButton.classList.add('delete-button', 'project', 'fa-solid', 'fa-edit');
        editButton.id = 'edit-button';
        const deleteButton = document.createElement('a');
        deleteButton.classList.add('delete-button', 'project', 'fa-solid', 'fa-trash');
        deleteButton.id = 'delete-button';

        buttonContainer.append(editButton, deleteButton);
        container.appendChild(buttonContainer);

        container.addEventListener('click', (event) => {
            const target = event.target.closest('[id]');

            switch(target.id) {
                case 'delete-button':
                    this.deleteProject(event);
                    break;
                case 'edit-button':
                    homePage.editProject(event);
                    break;
                default:
                    if (event.target.classList.contains('project-name')){
                    homePage.selectProject(event);
                    }
                    break;
            }        
        });

        return container;
    }

    static editProjectContainer(id) {
        const projectContainer = document.querySelector(`#${id}`);
        const project = ProjectList.getProjectById(id);
        const projectName = projectContainer.querySelector('.project-name');

        projectName.textContent = project.name;
    }

    //Dom Actions

    static addTask(name, project, description, dueDate, priority) {
        const task = new Task(name, project, description, dueDate, priority);
        this.renderTask(task);
    }

    static renderTask(task){
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

    static editTask(event) {
        const taskId = event.currentTarget.closest('.task-container').id;
        const task = toDoList.getTask(taskId);
        if(task){
            this.modal.showEditModal(task);
        }
    }

    static deleteTask(event) {
        const task = event.currentTarget.closest('.task-container');
        const toDoListContainer = document.querySelector('.todo-list');
        toDoListContainer.removeChild(task);
        toDoList.deleteTask(task.id);
    }

    static addProject(name, colour) {
        console.log(name, colour);
        const project = new Project(name, colour);
        const projectHTML = homePage.createProjectHTML(project);
        const container = document.querySelector('#project-list');
        container.appendChild(projectHTML);
    }

    static editProject(event) {
        const projectId = event.currentTarget.closest('.project-container').id;
        const project = ProjectList.getProjectById(projectId);
        this.modal.showEditProjectModal(project);
    }

    static deleteProject(event) {
        const project = event.currentTarget.closest('.project-container');
        const projectList = document.querySelector('#project-list');
        projectList.removeChild(project);
        ProjectList.deleteProject(project.id);
    }

    static openTaskModal() {
        this.modal.showTaskModal();
    }

    static openProjectModal() {
        this.modal.showProjectModal();
    }
    
    static selectProject(event) {
        homePage.setTitle(event)
        const project = ProjectList.getProject(event.currentTarget.textContent);
        if(!project) {
            return;
        }
        const taskList = toDoList.getTasksByProject(project.id);
        homePage.populateToDoList(taskList);
    }

    static selectDefaultProject(event) {
        homePage.setTitle(event)

        const today = new Date();
        let sundayDate = '';
        if(getDay(new Date() === 'Sunday')) {
            sundayDate = today;
        } else {
            sundayDate = nextSunday(new Date());
        }
        
        switch(event.currentTarget.textContent) {
            case 'All Tasks':
                homePage.populateToDoList(toDoList.getAllTasks());
                break;
            case 'Today':
                homePage.populateToDoList(toDoList.getTasksByDate(today));
                break;
            case 'This Week':
                homePage.populateToDoList(toDoList.getTasksByDate(sundayDate));
                break;   
        }
    }

    static setTitle(event){
        const title = document.querySelector('.title');
        title.textContent = event.currentTarget.textContent;
    }

    static populateToDoList(array) {
        const toDoListContainer = document.querySelector('.todo-list');
        toDoListContainer.innerHTML = '';
        array.forEach(task => {
            this.renderTask(task);
        });
    }

    static toggleComplete(event) {
        const task = event.currentTarget.closest('.task-container');
        task.classList.toggle('task-container-checked');
    }
}