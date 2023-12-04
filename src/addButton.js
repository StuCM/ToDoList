export default class addButton {
    constructor(size, color, task){
        this.button = document.createElement('button');
        this.setColor(color);
        this.setSize(size);
        this.setIcon();
        this.setTask(task);
    }

    setSize(size) {
        if (size === "large"){
            this.button.classList.add("large");
        }
        else { this.button.classList.add("small"); }
    }

    setColor(color) {
        this.button.classList.add(color);
    }

    setIcon(){
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-plus');
        this.button.appendChild(icon);
    }

    setTask(task) {
        this.button.addEventListener('click', (event) => {
            task();
        });
    }
}