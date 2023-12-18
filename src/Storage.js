import { Project, ProjectList } from "./projects";
import toDoList from "./toDoList";
import Task from "./Task";
import homePage from "./homePage";

export default class Storage {  
    static storageAvailable(type) {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              // test name field too, because code might not be present
              // everything except Firefox
              e.name === "QuotaExceededError" ||
              // Firefox
              e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    }

    static saveToLocalStorage() {
        if (Storage.storageAvailable("localStorage")) {
            if (ProjectList.getAllProjects().length === 0 && toDoList.getAllTasks().length === 0) {
                localStorage.clear();
                return;
            }
            localStorage.setItem("projects", JSON.stringify(ProjectList.getAllProjects()));
            localStorage.setItem("tasks", JSON.stringify(toDoList.getAllTasks()));
            
        }
    }
    
    static loadFromLocalStorage() {
        if (Storage.storageAvailable("localStorage")) {
            
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            const projects = JSON.parse(localStorage.getItem("projects"));
            if (projects) {
                projects.forEach(project => {
                    homePage.addProject(project.name, project.colour);
                });
            }
            if (tasks) {
                tasks.forEach(task => {
                    homePage.addTask(task.name, task.project?.name, task.description, task.dueDate, task.priority);
                });
            }
        }
    }
} 