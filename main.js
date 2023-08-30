import { ApplicationContext } from "./js/ApplicationContext/applicationContext.js";
import { CarManagementSystem } from "./js/Car/CarManagementSystem/carManagementSystem.js";
import {
  carManagementView,
  initializeRegisterCarButtonEventListener,
  initializeDataTableEventLister,
} from "./js/Car/CarManagementView/carManagementView.js";
import { carRegistrationView } from "./js/Car/CarManagementView/carRegistrationModal.js";
import { carManagementTableView } from "./js/Car/CarManagementView/carManagementTableView.js";

function initializeApplicationContext() {
  let context = new ApplicationContext();
  context.addSystem(new CarManagementSystem());
  return context;
}

function rootDiv() {
  return document.querySelector("#root");
}

function initializeViews() {
  let div = rootDiv();
  div.append(carManagementView);
  div.append(carManagementTableView);
  div.append(carRegistrationView);
}

function initializeEventListeners(applicationContext) {
  initializeRegisterCarButtonEventListener(applicationContext);
  initializeDataTableEventLister(applicationContext);
}

function initialize() {
  let applicationContext = initializeApplicationContext();
  initializeViews();
  initializeEventListeners(applicationContext);
}

initialize();
