import { Car } from "../../Car/car.js";
import { CarTransaction } from "../carTransaction.js";
import {
  option,
  selectedObjectID,
  initializeDataTable,
} from "./carTransactionManagementTableView.js";

export {
  carTransactionRegistrationView,
  initializeRegisterCarTransactionButtonEventListener,
};
/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/

let carTransactionRegistrationView = document.createElement("div");
carTransactionRegistrationView.classList.add("modal", "fade");
carTransactionRegistrationView.setAttribute(
  "id",
  "carTransactionRegistrationModal"
);
carTransactionRegistrationView.setAttribute("tabindex", "-1");
carTransactionRegistrationView.setAttribute(
  "aria-labelledby",
  "carTransactionRegistrationModalLabel"
);
carTransactionRegistrationView.setAttribute("aria-hidden", "true");

carTransactionRegistrationView.innerHTML = `<div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="carTransactionRegistrationModalLabel">
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
       <form id="carTransactionRegistrationForm">
       <div class="radio-toolbar text-center">
          <input type="radio" id="radioInSale" name="radioCarTransaction" value="Pendiente">
          <label for="radioInSale">Pendiente</label>
          <input type="radio" id="radioSold" name="radioCarTransaction" value="Vendido">
          <label for="radioSold">Vendido</label>
        </div>
        <div class="text-center">
          <label for="radioCarTransaction" class="error"></label>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="manufacturer" class="col-form-label">Marca:</label>
            <input type="text" class="form-control" name="manufacturer" id="manufacturer" />
          </div>
          <div class="col-md-6">
            <label for="model" class="col-form-label">Modelo:</label>
            <input type="text" class="form-control" name="model" id="model" />
          </div>
          <div class="col-md-6">
            <label for="year" class="col-form-label">Año:</label>
            <input type="text" class="form-control" name="year" id="year"/>
          </div>
          <div class="col-md-6">
            <label for="mileage" class="col-form-label">Kilometraje:</label>
            <input type="text" class="form-control" name="mileage" id="mileage" />
          </div>
          <div class="col-md-6">
            <label for="purchasePrice" class="col-form-label">Precio de compra:</label>
            <input type="text" class="form-control" name="purchasePrice" id="purchasePrice" />
          </div>
          <div class="col-md-6">
            <label for="salePrice" class="col-form-label">Precio de venta:</label>
            <input type="text" class="form-control" name="salePrice" id="salePrice" />
          </div>
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
         id="add-carTransaction-button"
         name="button"
       >
         Agregar
       </button>
     </div>
   </div>
 </div>
   `;

function formIsValid() {
  $("#carTransactionRegistrationForm").validate({
    rules: {
      radioCarTransaction: {
        required: true,
      },
      manufacturer: {
        required: true,
      },
      model: {
        required: true,
      },
      year: {
        required: true,
        digits: true,
      },
      mileage: {
        required: true,
        digits: true,
      },
      purchasePrice: {
        required: true,
        digits: true,
      },
      salePrice: {
        required: true,
        digits: true,
      },
    },
    messages: {
      radioCarTransaction: { required: "Campo requerido." },
      manufacturer: { required: "Campo requerido." },
      model: { required: "Campo requerido." },
      year: {
        required: "Campo requerido.",
        digits: "Ingrese un año válido.",
      },
      mileage: {
        required: "Campo requerido.",
        digits: "Ingrese un kilometraje válido.",
      },
      purchasePrice: {
        required: "Campo requerido.",
        digits: "Ingrese un precio de compra válido.",
      },
      salePrice: {
        required: "Campo requerido.",
        digits: "Ingrese un precio de venta válido.",
      },
    },
  });
  return $("#carTransactionRegistrationForm").valid();
}

function initializeRegisterCarTransactionButtonEventListener(
  applicationContext
) {
  const sendButton = document.querySelector("#add-carTransaction-button");

  sendButton.addEventListener("click", (e) => {
    const manufacturer = document.querySelector("#manufacturer").value;
    const model = document.querySelector("#model").value;
    const year = document.querySelector("#year").value;
    const mileage = document.querySelector("#mileage").value;
    const purchasePrice = document.querySelector("#purchasePrice").value;
    const salePrice = document.querySelector("#salePrice").value;

    if (formIsValid()) {
      const state = document.querySelector(
        "input[name=radioCarTransaction]:checked"
      ).value;
      let car = new Car(manufacturer, model, parseInt(year), parseInt(mileage));
      let carTransaction = new CarTransaction(
        car,
        parseInt(purchasePrice),
        parseInt(salePrice),
        state
      );
      if (option == "Edit") {
        let originalCarTransaction = applicationContext
          .carTransactionManagementSystem()
          .carTransactionIdentifiedBy(selectedObjectID);
        applicationContext
          .carTransactionManagementSystem()
          .updateCarTransaction(originalCarTransaction, carTransaction);
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
          .carTransactionManagementSystem()
          .addCarTransaction(carTransaction);
      }
      $("#carTransactionRegistrationModal").modal("hide");
      document.querySelector("#carTransactionRegistrationForm").reset();
      /*Render again only the table, because if i reload all the page, when i have more than one, then
        i will start all again, returning to the first loaded page. -asalvidio
        */
      //location.reload();
      initializeDataTable(applicationContext);
    }
  });
}
