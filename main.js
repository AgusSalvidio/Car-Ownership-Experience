import { ApplicationContext } from "./js/ApplicationContext/applicationContext.js";
import { CarTransactionManagementSystem } from "./js/CarTransaction/CarTransactionManagementSystem/carTransactionManagementSystem.js";
import { FinancialTransactionManagementSystem } from "./js/FinancialTransaction/FinancialTransactionManagementSystem/financialTransactionManagementSystem.js";
import {
  initializeHomeView,
  initializeHomeNavButtonEventListener,
} from "./js/Home/homeView.js";
import { initializeFinancialTransactionNavButtonEventListener } from "./js/FinancialTransaction/FinancialTransactionManagementView/financialTransactionManagementView.js";
import { initializeCarTransactionNavButtonEventListener } from "./js/CarTransaction/CarTransactionManagementView/carTransactionManagementView.js";

function initializeApplicationContext() {
  let context = new ApplicationContext();
  context.addSystem(new CarTransactionManagementSystem());
  context.addSystem(new FinancialTransactionManagementSystem());
  return context;
}

function initializeMainView(applicationContext) {
  initializeHomeView(applicationContext);
}

function initializeNavEventListeners(applicationContext) {
  initializeHomeNavButtonEventListener(applicationContext);
  initializeCarTransactionNavButtonEventListener(applicationContext);
  initializeFinancialTransactionNavButtonEventListener(applicationContext);
}

function initialize() {
  let applicationContext = initializeApplicationContext();
  initializeMainView(applicationContext);
  initializeNavEventListeners(applicationContext);
}

initialize();
