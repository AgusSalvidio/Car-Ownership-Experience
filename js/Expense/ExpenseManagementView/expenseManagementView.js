export { initializeExpenseNavButtonEventListener };
import {
  expenseManagementTableView,
  initializeDataTableEventLister,
} from "./expenseManagementTableView.js";
import {
  expenseRegistrationView,
  initializeRegisterExpenseButtonEventListener,
} from "./expenseRegistrationModal.js";
import { expenseInfoView } from "./expenseNotesModal.js";

import { rootDiv, unloadPreviousView } from "../../Utils/utils.js";

function initializeExpenseManagementView(applicationContext) {
  let div = rootDiv();
  //These should be separeted initialize messages
  div.append(expenseRegistrationView);
  div.append(expenseInfoView);
  div.append(expenseManagementView);
  div.append(expenseManagementTableView);
  initializeEventListeners(applicationContext);
}

let expenseManagementView = document.createElement("div");
expenseManagementView.classList.add("d-flex", "justify-content-end", "p-2");
expenseManagementView.setAttribute("id", "expense-management-view");
expenseManagementView.innerHTML = `<legend class="">Administrar Gastos</legend>
  <!-- Button trigger modal -->
  <button
  class="btn btn-md btn-primary"
  id="addExpenseButton"
  >
  Agregar
  </button>
  `;

function initializeEventListeners(applicationContext) {
  initializeRegisterExpenseButtonEventListener(applicationContext);
  initializeDataTableEventLister(applicationContext);
  initializeAddExpenseButtonEventListener(applicationContext);
}

function initializeAddExpenseButtonEventListener(applicationContext) {
  const addButton = document.querySelector("#addExpenseButton");
  const modal = new bootstrap.Modal("#expenseRegistrationModal");
  addButton.addEventListener("click", (e) => {
    let modalLabel = document.querySelector("#expenseRegistrationModalLabel");
    modalLabel.innerHTML = "Agregar gasto";
    document.querySelector("#expenseRegistrationForm").reset();
    modal.show();
  });
}

function initializeExpenseNavButtonEventListener(applicationContext) {
  const expenseNavButton = document.querySelector("#expenseNavButton");
  expenseNavButton.addEventListener("click", (e) => {
    unloadPreviousView(applicationContext);
    initializeExpenseManagementView(applicationContext);
  });
}
