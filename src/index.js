import homePage from "./homePage";
import homePageController from "./controllers/homePageController";
import styles from "./css/styles.css";

function launchPage() {
    homePage.createHomePage();
    homePageController.addTask("MyProject", "MyTask", "MyDescription", "MyDueDate", "MyPriority");
}

launchPage();
    