import homePage from "./homePage";
import styles from "./css/styles.css";
import toDoList from "./toDoList";
import { ProjectList } from "./projects";
import { format } from 'date-fns';
import Storage from "./Storage";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


function launchPage() {
    homePage.createHomePage();

    if(localStorage.length !== 0) {
        Storage.loadFromLocalStorage();
    }
    else {
        homePage.addProject("My Project", "#FE5E2C");
        const now = format(new Date(), "yyyy-MM-dd");
        homePage.addTask("MyTask", "My Project", "MyDescription", now, "MyPriority");
    }
    


}

launchPage();
    