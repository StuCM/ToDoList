import homePage from "./homePage";
import styles from "./css/styles.css";
import toDoList from "./toDoList";
import { ProjectList } from "./projects";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


function launchPage() {
    homePage.createHomePage();
    homePage.addTask("MyProject", "MyTask", "MyDescription", "MyDueDate", "MyPriority");
    
}

launchPage();
    