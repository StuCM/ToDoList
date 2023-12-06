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
        const projectInput = document.createElement('input');
        projectInput.type = 'select';
        projectInput.placeholder = 'Project';
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
        form.append(heading, titleInput, descriptionInput, projectInput, dateInput, buttons);
        modal.appendChild(form);

        return modal;
    }
    
    
}