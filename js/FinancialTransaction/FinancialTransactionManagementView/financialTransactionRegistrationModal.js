import { FinancialTransaction } from "../financialTransaction.js";
import {
  listFinancialTransactions,
  option,
  selectedObjectID,
  initializeDataTable,
} from "./financialTransactionManagementTableView.js";

export {
  financialTransactionRegistrationView,
  initializeRegisterFinancialTransactionButtonEventListener,
};

let financialTransactionRegistrationView = document.createElement("div");
financialTransactionRegistrationView.classList.add("modal", "fade");
financialTransactionRegistrationView.setAttribute(
  "id",
  "financialTransactionRegistrationModal"
);
financialTransactionRegistrationView.setAttribute("tabindex", "-1");
financialTransactionRegistrationView.setAttribute(
  "aria-labelledby",
  "financialTransactionRegistrationModalLabel"
);
financialTransactionRegistrationView.setAttribute("aria-hidden", "true");

financialTransactionRegistrationView.innerHTML = `<div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="financialTransactionRegistrationModalLabel">
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
       <form id="financialTransactionRegistrationForm">
        <div class="radio-toolbar text-center">
          <input type="radio" id="radioDeposit" name="radioFinancialTransaction" value="Ingreso">
          <label for="radioDeposit">Ingreso</label>
          <input type="radio" id="radioWithdrawal" name="radioFinancialTransaction" value="Egreso">
          <label for="radioWithdrawal">Egreso</label>
        </div>
         <div class="mb-3">
           <label for="price" class="col-form-label">Precio(ARS):</label>
           <input type="text" class="form-control" name="price" id="price" />
         </div>
         <div class="mb-3">
           <label for="notes" class="col-form-label">Notas:</label>
           <textarea rows="4" cols="54" name="notes" id="notes"></textarea>
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
         id="add-financialTransaction-button"
         name="button"
       >
         Agregar
       </button>
     </div>
   </div>
 </div>
   `;

function formIsValid() {
  $("#financialTransactionRegistrationForm").validate({
    rules: {
      radioFinancialTransaction: {
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
      radioFinancialTransaction: { required: "Campo requerido." },
      price: {
        required: "Campo requerido.",
        digits: "Ingrese un precio válido",
      },
      notes: {
        required: "Campo requerido.",
      },
    },
  });
  return $("#financialTransactionRegistrationForm").valid();
}

function initializeRegisterFinancialTransactionButtonEventListener(
  applicationContext
) {
  const sendButton = document.querySelector("#add-financialTransaction-button");

  sendButton.addEventListener("click", (e) => {
    const type = document.querySelector(
      "input[name=radioFinancialTransaction]:checked"
    ).value;
    const price = document.querySelector("#price").value;
    const notes = document.querySelector("#notes").value;

    if (formIsValid()) {
      let financialTransaction = new FinancialTransaction(
        type,
        parseInt(price),
        notes
      );
      if (option == "Edit") {
        let originalFinancialTransaction = applicationContext
          .financialTransactionManagementSystem()
          .financialTransactionIdentifiedBy(selectedObjectID);
        applicationContext
          .financialTransactionManagementSystem()
          .updateFinancialTransaction(
            originalFinancialTransaction,
            financialTransaction
          );
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
        applicationContext
          .financialTransactionManagementSystem()
          .addFinancialTransaction(financialTransaction);
      }
      $("#financialTransactionRegistrationModal").modal("hide");
      document.querySelector("#financialTransactionRegistrationForm").reset();
      initializeDataTable(applicationContext);
    }
  });
}
