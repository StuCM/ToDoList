export default class Modal {
    constructor() {
        this.modal = this.buildModal();
    }

    buildModal() {
        const modal = document.createElement('dialog');
        const form = document.createElement('form');
        form.method = 'dialog';
        const heading = document.createElement('h1');
        heading.textContent = 'Add a new task';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        const projectInput = document.createElement('input');
        projectInput.type = 'dropdown';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add';
        const cancelButton = document.createElement('button');
        cancelButton.type = 'submit';
        cancelButton.textContent = 'Close';
        form.append(heading, titleInput, descriptionInput, projectInput, dateInput, cancelButton, submitButton);
        modal.appendChild(form);

        return modal;
    }
    
    
}