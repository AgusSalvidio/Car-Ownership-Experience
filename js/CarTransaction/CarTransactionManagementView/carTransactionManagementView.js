export {
  initializeCarTransactionManagementView,
  initializeCarTransactionNavButtonEventListener,
};
import {
  carTransactionManagementTableView,
  initializeDataTableEventLister,
  updateOptionModalWith,
} from "./carTransactionManagementTableView.js";
import {
  carTransactionRegistrationView,
  initializeRegisterCarTransactionButtonEventListener,
} from "./carTransactionRegistrationModal.js";
import { rootDiv, unloadPreviousView } from "../../Utils/utils.js";

function initializeCarTransactionManagementView(applicationContext) {
  let div = rootDiv();
  //These should be separeted initialize messages
  div.append(carTransactionRegistrationView);
  div.append(carTransactionManagementView);
  div.append(carTransactionManagementTableView);
  initializeEventListeners(applicationContext);
}

/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/
let carTransactionManagementView = document.createElement("div");
carTransactionManagementView.classList.add(
  "d-flex",
  "justify-content-end",
  "p-2"
);
carTransactionManagementView.setAttribute(
  "id",
  "carTransaction-management-view"
);
carTransactionManagementView.innerHTML = `<legend class="">Administrar Operaciones de Autos</legend>
<!-- Button trigger modal -->
<button
class="btn btn-md btn-primary"
id="addCarTransactionButton"
>
Agregar
</button>
`;

function initializeEventListeners(applicationContext) {
  initializeRegisterCarTransactionButtonEventListener(applicationContext);
  initializeDataTableEventLister(applicationContext);
  initializeAddCarTransactionButtonEventListener(applicationContext);
}

function initializeCarTransactionNavButtonEventListener(applicationContext) {
  const carTransactionNavButton = document.querySelector(
    "#carTransactionNavButton"
  );
  carTransactionNavButton.addEventListener("click", (e) => {
    unloadPreviousView(applicationContext);
    initializeCarTransactionManagementView(applicationContext);
  });
}

function initializeAddCarTransactionButtonEventListener(applicationContext) {
  const addButton = document.querySelector("#addCarTransactionButton");

  let modal = new bootstrap.Modal("#carTransactionRegistrationModal");

  addButton.addEventListener("click", (e) => {
    let modalLabel = document.querySelector(
      "#carTransactionRegistrationModalLabel"
    );
    updateOptionModalWith("");
    modalLabel.innerHTML = "Agregar operación de auto";
    document.querySelector("#carTransactionRegistrationForm").reset();
    modal.show();
  });
}
