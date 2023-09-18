import { ApplicationContext } from "./js/ApplicationContext/applicationContext.js";
import { CarManagementSystem } from "./js/Car/CarManagementSystem/carManagementSystem.js";
import { FinancialTransactionManagementSystem } from "./js/FinancialTransaction/FinancialTransactionManagementSystem/financialTransactionManagementSystem.js";
import {
  initializeHomeView,
  initializeHomeNavButtonEventListener,
} from "./js/Home/homeView.js";
import { initializeFinancialTransactionNavButtonEventListener } from "./js/FinancialTransaction/FinancialTransactionManagementView/financialTransactionManagementView.js";
import { initializeCarNavButtonEventListener } from "./js/Car/CarManagementView/carManagementView.js";

function initializeApplicationContext() {
  let context = new ApplicationContext();
  context.addSystem(new CarManagementSystem());
  context.addSystem(new FinancialTransactionManagementSystem());
  return context;
}

function initializeMainView(applicationContext) {
  initializeHomeView(applicationContext);
}

function initializeNavEventListeners(applicationContext) {
  initializeHomeNavButtonEventListener(applicationContext);
  initializeCarNavButtonEventListener(applicationContext);
  initializeFinancialTransactionNavButtonEventListener(applicationContext);
}

function initialize() {
  let applicationContext = initializeApplicationContext();
  initializeMainView(applicationContext);
  initializeNavEventListeners(applicationContext);
}

initialize();
