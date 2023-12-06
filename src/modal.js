import homePage from "./homePage";
import { ProjectList } from "./projects";
import Task from "./Task";

export default class Modal {
    constructor() {
        this.modal = this.buildModal();
    }

    buildModal() {
        const modal = document.createElement('dialog');
        modal.classList.add('modal-container');
        const form = document.createElement('form');
        form.method = 'dialog';
        form.classList.add('modal-form');
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
        const buttons = document.createElement('div');
        buttons.classList.add('modal-buttons');
        const cancelButton = document.createElement('button');
        cancelButton.type = 'submit';
        cancelButton.textContent = 'Close';
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add';
        buttons.append(cancelButton, submitButton,);
        form.append(heading, titleInput, descriptionInput, this.projectInput, dateInput, buttons);
        modal.appendChild(form);

        this.projectInput.addEventListener('change', (event) => {
            this.projectInput.style.color = this.value != '' ? 'black' : 'var(--font-color)';
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            homePage.addTask(titleInput.value, this.projectInput.value, descriptionInput.value, dateInput.value);
            this.modal.close();
        })

        return modal;
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

    showModal() {
        this.getProjectOptions();
        this.modal.showModal();
    }  
    
}