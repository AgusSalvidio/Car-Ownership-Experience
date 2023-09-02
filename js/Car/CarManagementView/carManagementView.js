export { initializeCarManagementView, initializeCarNavButtonEventListener };
import {
  carManagementTableView,
  initializeDataTableEventLister,
} from "./carManagementTableView.js";
import {
  carRegistrationView,
  initializeRegisterCarButtonEventListener,
} from "./carRegistrationModal.js";
import { rootDiv, unloadPreviousView } from "../../Utils/utils.js";

function initializeCarManagementView(applicationContext) {
  let div = rootDiv();
  //These should be separeted initialize messages
  div.append(carRegistrationView);
  div.append(carManagementView);
  div.append(carManagementTableView);
  initializeEventListeners(applicationContext);
}

/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/
let carManagementView = document.createElement("div");
carManagementView.classList.add("d-flex", "justify-content-end", "p-2");
carManagementView.setAttribute("id", "car-management-view");
carManagementView.innerHTML = `<legend class="">Administrar Autos</legend>
<!-- Button trigger modal -->
<button
class="btn btn-md btn-primary"
id="addCarButton"
>
Agregar
</button>
`;

function initializeEventListeners(applicationContext) {
  initializeRegisterCarButtonEventListener(applicationContext);
  initializeDataTableEventLister(applicationContext);
  initializeAddCarButtonEventListener(applicationContext);
}

function initializeCarNavButtonEventListener(applicationContext) {
  const carNavButton = document.querySelector("#carNavButton");
  carNavButton.addEventListener("click", (e) => {
    unloadPreviousView(applicationContext);
    initializeCarManagementView(applicationContext);
  });
}

function initializeAddCarButtonEventListener(applicationContext) {
  const addButton = document.querySelector("#addCarButton");
  const modal = new bootstrap.Modal("#carRegistrationModal");
  addButton.addEventListener("click", (e) => {
    let modalLabel = document.querySelector("#carRegistrationModalLabel");
    modalLabel.innerHTML = "Agregar auto";
    document.querySelector("#carRegistrationForm").reset();
    modal.show();
  });
}
