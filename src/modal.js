import homePage from "./homePage";
import { ProjectList } from "./projects";
import Task from "./Task";
import Storage from "./Storage";

export default class Modal {
    constructor() {
        this.modal = this.buildModal();
    }

    submitEventListener = null;

    buildModal() {
        const modal = document.createElement('dialog');
        modal.classList.add('modal-container');
        const form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('modal-form');
        
        const buttons = document.createElement('div');
        buttons.classList.add('modal-buttons');
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Close';

        cancelButton.addEventListener('click', (event) => {
            this.modal.close();
        });
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add';
        buttons.append(cancelButton, submitButton,);
        form.append(buttons);
        modal.appendChild(form);

        return modal;
    }

    clearFormContent() {
        const form = document.querySelector('.modal-form');
        const buttons = document.querySelector('.modal-buttons');

        while (form.firstChild) {
            form.removeChild(form.firstChild);
        }

        if(this.submitEventListener) {  
            form.removeEventListener('submit', this.submitEventListener);
        }

        form.appendChild(buttons);
    }

    createTaskContent() {
        this.clearFormContent();
        const form = document.querySelector('.modal-form');
        const heading = document.createElement('h1');
        heading.textContent = 'Add a new task';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.placeholder = 'Task';
        titleInput.required = true;
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.id = 'description';
        descriptionInput.placeholder = 'Description';
        const projectInput = document.createElement('select');
        projectInput.name = 'projects';
        projectInput.placeholder = 'Select a Project';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.placeholder = 'Due Date';
        form.prepend(heading, titleInput, descriptionInput, projectInput, dateInput);

        projectInput.addEventListener('change', (event) => {
            projectInput.style.color = this.value != '' ? 'black' : 'var(--font-color)';
        });

        this.submitEventListener = (event) => {
            event.preventDefault();
            homePage.addTask(titleInput.value, this.projectInput.value, descriptionInput.value, dateInput.value);
            Storage.saveToLocalStorage();
            this.modal.close();
        };

        form.addEventListener('submit', this.submitEventListener);
    }

    editTaskContent(task) {
        this.createTaskContent();
        const heading = document.querySelector('h1');
        const titleInput = document.querySelector('#title');
        const descriptionInput = document.querySelector('#description');
        const projectInput = document.querySelector('select');
        const dateInput = document.querySelector('input[type="date"]');
        const submitButton = document.querySelector('button[type="submit"]');

        heading.textContent = 'Edit Task';
        titleInput.value = task.name;
        descriptionInput.value = task.description;
        dateInput.value = task.dueDate;
        submitButton.textContent = 'Save';

        const form = document.querySelector('.modal-form');

        form.removeEventListener('submit', this.submitEventListener);

        this.submitEventListener = (event) => {
            event.preventDefault();
            task.setName(titleInput.value);
            task.setDescription(descriptionInput.value);
            task.setProject(projectInput.value);
            task.setDueDate(dateInput.value);
            this.modal.close();
            homePage.editTaskContainer(task.id)
            Storage.saveToLocalStorage();
        };

        form.addEventListener('submit', this.submitEventListener);
    }

    createProjectContent() {
        this.clearFormContent();
        const form = document.querySelector('.modal-form');

        const heading = document.createElement('h1');

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        heading.textContent = 'Add a new project';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Project Name';
        titleInput.required = true;
        const color = document.createElement('input');
        color.type = 'color';
        inputContainer.append(titleInput, color);
        form.prepend(heading, inputContainer);

        this.submitEventListener = (event) => {
            event.preventDefault();
            homePage.addProject(titleInput.value, color.value);
            Storage.saveToLocalStorage();
            this.modal.close();
        }

        form.addEventListener('submit', this.submitEventListener);
    }

    editProjectContent(project) {
        this.createProjectContent();
        const heading = document.querySelector('h1');
        const titleInput = document.querySelector('input[type="text"]');
        const submitButton = document.querySelector('button[type="submit"]');

        heading.textContent = 'Edit Project';
        titleInput.value = project.name;
        submitButton.textContent = 'Save';

        const form = document.querySelector('.modal-form');

        form.removeEventListener('submit', this.submitEventListener);

        this.submitEventListener = (event) => {
            event.preventDefault();
            project.setName(titleInput.value);
            this.modal.close();
            homePage.editProjectContainer(project.id);
            Storage.saveToLocalStorage();
        };

        form.addEventListener('submit', this.submitEventListener);
    }

    getProjectOptions(selectedProjectName = null) {  
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select a Project';
        placeholder.disabled = true; 
        placeholder.selected = true;

        this.projectInput = document.querySelector('select');
        this.projectInput.appendChild(placeholder); 
        placeholder.hidden = true;
           
        ProjectList.getAllProjects().forEach(project => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            this.projectInput.appendChild(option);

            if (project.name === selectedProjectName) {
                option.selected = true;
                placeholder.selected = false;
                this.projectInput.style.color = 'black';
            }
        });
    };

    showTaskModal() {
        this.createTaskContent();
        this.getProjectOptions();
        this.modal.showModal();
    }  

    showProjectModal() {
        this.createProjectContent();
        this.modal.showModal();
    }

    showEditModal(task) {
        this.editTaskContent(task);
        this.getProjectOptions(task.project?.name);
        this.modal.showModal();
    }

    showEditProjectModal(project) {
        this.editProjectContent(project);
        this.modal.showModal();
    }
    
}