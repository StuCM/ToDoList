import homePage from "./homePage";
import { ProjectList } from "./projects";
import Task from "./Task";

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
        titleInput.placeholder = 'Task';
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Description';
        this.projectInput = document.createElement('select');
        this.projectInput.name = 'projects';
        this.projectInput.placeholder = 'Select a Project';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.placeholder = 'Due Date';
        form.prepend(heading, titleInput, descriptionInput, this.projectInput, dateInput);

        this.projectInput.addEventListener('change', (event) => {
            this.projectInput.style.color = this.value != '' ? 'black' : 'var(--font-color)';
        });

        this.submitEventListener = (event) => {
            event.preventDefault();
            homePage.addTask(titleInput.value, this.projectInput.value, descriptionInput.value, dateInput.value);
            this.modal.close();
        };

        form.addEventListener('submit', this.submitEventListener);
    }

    createProjectContent() {
        this.clearFormContent();
        const form = document.querySelector('.modal-form');

        const heading = document.createElement('h1');
        heading.textContent = 'Add a new project';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Project Name';
        form.prepend(heading, titleInput);

        this.submitEventListener = (event) => {
            event.preventDefault();
            homePage.addProject(titleInput.value);
            this.modal.close();
        }

        form.addEventListener('submit', this.submitEventListener);
    }

    getProjectOptions() {  
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select a Project';
        placeholder.disabled = true; 

        this.projectInput.appendChild(placeholder); 
        placeholder.selected = true;
        placeholder.hidden = true;
           
        ProjectList.getAllProjects().forEach(project => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            this.projectInput.appendChild(option);
        })
        
        placeholder.selected = true;
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
    
}