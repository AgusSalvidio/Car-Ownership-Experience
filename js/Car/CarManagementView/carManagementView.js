import { Car } from "../car.js";
export { carManagementView, initializeRegisterCarButtonEventListener };
/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/

let carManagementView = document.createElement("div");
carManagementView.classList.add("d-flex", "justify-content-end", "p-2");
carManagementView.setAttribute("id", "car-management-view");
carManagementView.innerHTML = `<legend class="">Administrar Autos</legend>
<!-- Button trigger modal -->
<div>
<button
type="button"
class="btn btn-primary"
data-bs-toggle="modal"
data-bs-target="#carRegistrationModal"
>
Agregar
</button>
`;

function addToTable(aCar) {
  let tableBody = document.querySelector("#car-management-tbody");
  let carRow = document.createElement("tr");
  carRow.innerHTML = `
  <td>${aCar.manufacturer}</td>
  <td>${aCar.model}</td>
  <td>${aCar.year}</td>
  <td>${aCar.mileage}</td>
`;
  tableBody.append(carRow);
}

/* This is not the best implementation mainly because you dont know what failed, does not validate numbers
   and have to load all again but for now and to avoid fighting with forms logic this should do the trick
   to avoid empty inputs. -asalvidio.*/

function formFieldsAreValid(aValueCollection) {
  const isEmpty = (value) => !value;

  if (aValueCollection.some(isEmpty)) {
    alert(
      "Error al ingresar los datos, alguno de los campos se encuentra vacio"
    );
    return false;
  }
  return true;
}

function initializeRegisterCarButtonEventListener(applicationContext) {
  const sendButton = document.querySelector("#add-car-button");

  sendButton.addEventListener("click", (e) => {
    const manufacturer = document.querySelector("#manufacturer").value;
    const model = document.querySelector("#model").value;
    const year = document.querySelector("#year").value;
    const mileage = document.querySelector("#mileage").value;

    if (formFieldsAreValid([manufacturer, model, year, mileage])) {
      let car = new Car(manufacturer, model, year, mileage);
      applicationContext.carManagementSystem().addCar(car);
      addToTable(car);
      document.querySelector("#car-registration-form").reset();
      $("#carRegistrationModal").modal("hide");
    }
  });
}
