export {
    initializeAddExpenseButtonEventListener,
    initializeExpenseManagementView,
  };
  import { expenseManagementTableView } from "./expenseManagementTableView.js";
  import { expenseRegistrationView } from "./expenseRegistrationModal.js";
  function rootDiv() {
    return document.querySelector("#root");
  }
  
  function initializeExpenseManagementView() {
    let div = rootDiv();
    //These should be separeted initialize messages
    div.append(expenseRegistrationView);
    div.append(expenseManagementView);
    div.append(expenseManagementTableView);
  }
  
  let expenseManagementView = document.createElement("div");
  expenseManagementView.classList.add("d-flex", "justify-content-end", "p-2");
  expenseManagementView.setAttribute("id", "expense-management-view");
  expenseManagementView.innerHTML = `<legend class="">Administrar Gastos</legend>
  <!-- Button trigger modal -->
  <button
  class="btn btn-sm btn-primary"
  id="addExpenseButton"
  >
  <i class="fa-solid fa-plus"></i>
  Agregar
  </button>
  `;
  
  function initializeExpenseButtonEventListener(applicationContext) {
    const addButton = document.querySelector("#addExpenseButton");
    const modal = new bootstrap.Modal("#expenseRegistrationModal");
    addButton.addEventListener("click", (e) => {
      let modalLabel = document.querySelector("#expenseRegistrationModalLabel");
      modalLabel.innerHTML = "Agregar gasto";
      document.querySelector("#expenseRegistrationForm").reset();
      modal.show();
    });
  }
  