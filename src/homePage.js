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
        sidebar.innerHTML = 'sidebar';

        const toDoContainer = document.createElement('div')
        main.appendChild(toDoContainer);
        toDoContainer.classList.add('todo-container')

        const title = document.createElement('header');
        toDoContainer.appendChild(title);
        title.classList.add('title');
        title.innerHTML = 'ToDoList';

        const toDoList = document.createElement('div');
        toDoContainer.appendChild(toDoList);
        toDoList.classList.add('todo-list');
        toDoList.innerHTML = 'Tasks go here';
        
    }
}