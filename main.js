import { ApplicationContext } from "./js/ApplicationContext/applicationContext.js";
import { CarManagementSystem } from "./js/Car/CarManagementSystem/carManagementSystem.js";
import { ExpenseManagementSystem } from "./js/Expense/ExpenseManagementSystem/expenseManagementSystem.js";
import {
  initializeHomeView,
  initializeHomeNavButtonEventListener,
} from "./js/Home/homeView.js";
import { initializeExpenseNavButtonEventListener } from "./js/Expense/ExpenseManagementView/expenseManagementView.js";
import { initializeCarNavButtonEventListener } from "./js/Car/CarManagementView/carManagementView.js";

function initializeApplicationContext() {
  let context = new ApplicationContext();
  context.addSystem(new CarManagementSystem());
  context.addSystem(new ExpenseManagementSystem());
  return context;
}

function initializeMainView(applicationContext) {
  initializeHomeView(applicationContext);
}

function initializeNavEventListeners(applicationContext) {
  initializeHomeNavButtonEventListener(applicationContext);
  initializeCarNavButtonEventListener(applicationContext);
  initializeExpenseNavButtonEventListener(applicationContext);
}

function initialize() {
  let applicationContext = initializeApplicationContext();
  initializeMainView(applicationContext);
  initializeNavEventListeners(applicationContext);
}

initialize();
