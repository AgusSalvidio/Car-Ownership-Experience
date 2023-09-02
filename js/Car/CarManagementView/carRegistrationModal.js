import { Car } from "../car.js";
import {
  option,
  selectedObjectID,
  initializeDataTable,
} from "./carManagementTableView.js";

export { carRegistrationView, initializeRegisterCarButtonEventListener };
/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/

let carRegistrationView = document.createElement("div");
carRegistrationView.classList.add("modal", "fade");
carRegistrationView.setAttribute("id", "carRegistrationModal");
carRegistrationView.setAttribute("tabindex", "-1");
carRegistrationView.setAttribute(
  "aria-labelledby",
  "carRegistrationModalLabel"
);
carRegistrationView.setAttribute("aria-hidden", "true");

carRegistrationView.innerHTML = `<div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="carRegistrationModalLabel">
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
       <form id="carRegistrationForm">
         <div class="mb-3">
           <label for="manufacturer" class="col-form-label">Marca:</label>
           <input type="text" class="form-control" name="manufacturer" id="manufacturer" />
         </div>
         <div class="mb-3">
           <label for="model" class="col-form-label">Modelo:</label>
           <input type="text" class="form-control" name="model" id="model" />
         </div>
         <div class="mb-3">
           <label for="year" class="col-form-label">Año:</label>
           <input type="text" class="form-control" name="year" id="year"/>
         </div>
         <div class="mb-3">
           <label for="mileage" class="col-form-label">Kilometraje:</label>
           <input type="text" class="form-control" name="mileage" id="mileage" />
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
         id="add-car-button"
         name="button"
       >
         Agregar
       </button>
     </div>
   </div>
 </div>
   `;

function formIsValid() {
  $("#carRegistrationForm").validate({
    rules: {
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
    },
    messages: {
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
    },
  });
  return $("#carRegistrationForm").valid();
}

function initializeRegisterCarButtonEventListener(applicationContext) {
  const sendButton = document.querySelector("#add-car-button");

  sendButton.addEventListener("click", (e) => {
    const manufacturer = document.querySelector("#manufacturer").value;
    const model = document.querySelector("#model").value;
    const year = document.querySelector("#year").value;
    const mileage = document.querySelector("#mileage").value;

    if (formIsValid()) {
      let car = new Car(manufacturer, model, parseInt(year), parseInt(mileage));
      if (option == "Edit") {
        let originalCar = applicationContext
          .carManagementSystem()
          .carIdentifiedBy(selectedObjectID);
        applicationContext.carManagementSystem().updateCar(originalCar, car);
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
        applicationContext.carManagementSystem().addCar(car);
      }
      $("#carRegistrationModal").modal("hide");
      document.querySelector("#carRegistrationForm").reset();
      /*Render again only the table, because if i reload all the page, when i have more than one, then
        i will start all again, returning to the first loaded page. -asalvidio
        */
      //location.reload();
      initializeDataTable(applicationContext);
    }
  });
}
