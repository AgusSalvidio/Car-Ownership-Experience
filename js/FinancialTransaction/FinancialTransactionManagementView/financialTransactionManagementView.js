export { initializeFinancialTransactionNavButtonEventListener };
import {
  financialTransactionManagementTableView,
  initializeDataTableEventLister,
  updateOptionModalWith,
} from "./financialTransactionManagementTableView.js";
import {
  financialTransactionRegistrationView,
  initializeRegisterFinancialTransactionButtonEventListener,
} from "./financialTransactionRegistrationModal.js";
import { financialTransactionInfoView } from "./financialTransactionNotesModal.js";

import { rootDiv, unloadPreviousView } from "../../Utils/utils.js";

function initializeFinancialTransactionManagementView(applicationContext) {
  let div = rootDiv();
  //These should be separeted initialize messages
  div.append(financialTransactionRegistrationView);
  div.append(financialTransactionInfoView);
  div.append(financialTransactionManagementView);
  div.append(financialTransactionManagementTableView);
  initializeEventListeners(applicationContext);
}

let financialTransactionManagementView = document.createElement("div");
financialTransactionManagementView.classList.add(
  "d-flex",
  "justify-content-end",
  "p-2"
);
financialTransactionManagementView.setAttribute(
  "id",
  "financialTransaction-management-view"
);
financialTransactionManagementView.innerHTML = `<legend class="">Administrar Ingreso/Egreso</legend>
  <!-- Button trigger modal -->
  <button
  class="btn btn-md btn-primary"
  id="addFinancialTransactionButton"
  >
  Agregar
  </button>
  `;

function initializeEventListeners(applicationContext) {
  initializeRegisterFinancialTransactionButtonEventListener(applicationContext);
  initializeDataTableEventLister(applicationContext);
  initializeAddFinancialTransactionButtonEventListener(applicationContext);
}

function initializeAddFinancialTransactionButtonEventListener(
  applicationContext
) {
  const addButton = document.querySelector("#addFinancialTransactionButton");

  let modal = bootstrap.Modal.getInstance(
    document.querySelector("#financialTransactionRegistrationModal")
  );

  if (modal) {
    modal.dispose();
  }

  modal = new bootstrap.Modal("#financialTransactionRegistrationModal");
  addButton.addEventListener("click", (e) => {
    let modalLabel = document.querySelector(
      "#financialTransactionRegistrationModalLabel"
    );
    updateOptionModalWith("");
    modalLabel.innerHTML = "Agregar Ingreso/Egreso";
    document.querySelector("#financialTransactionRegistrationForm").reset();
    modal.show();
  });
}

function initializeFinancialTransactionNavButtonEventListener(
  applicationContext
) {
  const financialTransactionNavButton = document.querySelector(
    "#financialTransactionNavButton"
  );
  financialTransactionNavButton.addEventListener("click", (e) => {
    unloadPreviousView(applicationContext);
    initializeFinancialTransactionManagementView(applicationContext);
  });
}
