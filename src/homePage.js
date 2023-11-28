export default class homePage {
    
    loadHomepage(){
        
    }

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
        toDoList.innerHTML = 'Tasks go here';
        
    }
}