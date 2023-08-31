export { initializeAddCarButtonEventListener, initializeCarManagementView };
import { carManagementTableView } from "./carManagementTableView.js";
import { carRegistrationView } from "./carRegistrationModal.js";
function rootDiv() {
  return document.querySelector("#root");
}

function initializeCarManagementView() {
  let div = rootDiv();
  //These should be separeted initialize messages
  div.append(carRegistrationView);
  div.append(carManagementView);
  div.append(carManagementTableView);
}

/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/
let carManagementView = document.createElement("div");
carManagementView.classList.add("d-flex", "justify-content-end", "p-2");
carManagementView.setAttribute("id", "car-management-view");
carManagementView.innerHTML = `<legend class="">Administrar Autos</legend>
<!-- Button trigger modal -->
<button
class="btn btn-sm btn-primary"
id="addCarButton"
>
<i class="fa-solid fa-plus"></i>
Agregar
</button>
`;

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
