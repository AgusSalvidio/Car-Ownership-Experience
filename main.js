import { ApplicationContext } from "./js/ApplicationContext/applicationContext.js";
import { CarManagementSystem } from "./js/Car/CarManagementSystem/carManagementSystem.js";
import { initializeDataTableEventLister } from "./js/Car/CarManagementView/carManagementTableView.js";
import {
  initializeAddCarButtonEventListener,
  initializeCarManagementView,
} from "./js/Car/CarManagementView/carManagementView.js";
import { initializeRegisterCarButtonEventListener } from "./js/Car/CarManagementView/carRegistrationModal.js";

function initializeApplicationContext() {
  let context = new ApplicationContext();
  context.addSystem(new CarManagementSystem());
  return context;
}

function initializeViews() {
  initializeCarManagementView();
}

function initializeEventListeners(applicationContext) {
  initializeRegisterCarButtonEventListener(applicationContext);
  initializeDataTableEventLister(applicationContext);
  initializeAddCarButtonEventListener(applicationContext);
}

function initialize() {
  let applicationContext = initializeApplicationContext();
  initializeViews();
  initializeEventListeners(applicationContext);
}

initialize();
