import { Expense } from "../expense.js";
import {
  listExpenses,
  option,
  selectedObjectID,
  initializeDataTable,
} from "./expenseManagementTableView.js";

export {
  expenseRegistrationView,
  initializeRegisterExpenseButtonEventListener,
};

let expenseRegistrationView = document.createElement("div");
expenseRegistrationView.classList.add("modal", "fade");
expenseRegistrationView.setAttribute("id", "expenseRegistrationModal");
expenseRegistrationView.setAttribute("tabindex", "-1");
expenseRegistrationView.setAttribute(
  "aria-labelledby",
  "expenseRegistrationModalLabel"
);
expenseRegistrationView.setAttribute("aria-hidden", "true");

expenseRegistrationView.innerHTML = `<div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="expenseRegistrationModalLabel">
       </h1>
       <button
         type="button"
         class="btn-close"
         data-bs-dismiss="modal"
         aria-label="Close"
       ></button>
     </div>
     <div class="modal-body">
     <div class="container-fluid">
       <form id="expenseRegistrationForm">
         <div class="mb-3">
           <label for="name" class="col-form-label">Nombre del gasto:</label>
           <input type="text" class="form-control" name="name" id="name" />
         </div>
         <div class="mb-3">
           <label for="price" class="col-form-label">Precio:</label>
           <input type="text" class="form-control" name="price" id="price" />
         </div>
         <div class="mb-3">
           <label for="notes" class="col-form-label">Notas:</label>
           <input type="text" class="form-control" name="notes" id="notes"/>
         </div>
       </form>
       </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
         Cancelar
       </button>
       <button
         type="submit"
         class="btn btn-primary"
         id="add-expense-button"
         name="button"
       >
         Agregar
       </button>
     </div>
   </div>
 </div>
   `;

function formIsValid() {
  $("#expenseRegistrationForm").validate({
    rules: {
      name: {
        required: true,
      },
      price: {
        required: true,
        digits: true,
      },
      notes: {
        required: true,
      },
    },
    messages: {
      name: { required: "Campo requerido." },
      price: {
        required: "Campo requerido.",
        digits: "Ingrese un precio válido",
      },
      notes: {
        required: "Campo requerido.",
      },
    },
  });
  return $("#expenseRegistrationForm").valid();
}

function initializeRegisterExpenseButtonEventListener(applicationContext) {
  const sendButton = document.querySelector("#add-expense-button");

  sendButton.addEventListener("click", (e) => {
    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const notes = document.querySelector("#notes").value;

    if (formIsValid()) {
      let expense = new Expense(name, parseInt(price), notes);
      if (option == "Edit") {
        let originalExpense = applicationContext
          .expenseManagementSystem()
          .expenseIdentifiedBy(selectedObjectID);
        applicationContext
          .expenseManagementSystem()
          .updateExpense(originalExpense, expense);
        Toastify({
          text: "Se ha actualizado satisfactoriamente",
          duration: 2000,
          gravity: "bottom",
          position: "center",
          style: {
            background: "#007ee5",
          },
        }).showToast();
      } else {
        applicationContext.expenseManagementSystem().addExpense(expense);
      }
      document.querySelector("#expenseRegistrationForm").reset();
      $("#expenseRegistrationModal").modal("hide");
      initializeDataTable(applicationContext);
    }
  });
}
