import homePage from "./homePage";
import styles from "./css/styles.css";
import toDoList from "./toDoList";

function launchPage() {
    homePage.createHomePage();
    homePage.addProject("MyProject");
    homePage.addTask("MyProject", "MyTask", "MyDescription", "MyDueDate", "MyPriority");
    
}



launchPage();
    