import homePage from "./homePage";
import styles from "./css/styles.css";

function launchPage() {
    homePage.createHomePage();
    homePage.addTask("MyProject", "MyTask", "MyDescription", "MyDueDate", "MyPriority");
}

launchPage();
    