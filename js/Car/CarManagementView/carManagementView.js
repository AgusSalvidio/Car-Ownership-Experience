import { Car } from "../car.js";
export {
  carManagementView,
  initializeRegisterCarButtonEventListener,
  initializeDataTableEventLister,
};
/* Not the best implementation to render html code via Js, but for now, 
   the laughs and maybe a little bit for learning, this stays. -asalvidio*/

let carManagementView = document.createElement("div");
carManagementView.classList.add("d-flex", "justify-content-end", "p-2");
carManagementView.setAttribute("id", "car-management-view");
carManagementView.innerHTML = `<legend class="">Administrar Autos</legend>
<!-- Button trigger modal -->
<button
class="btn btn-sm btn-primary"
data-bs-toggle="modal"
data-bs-target="#carRegistrationModal"
>
<i class="fa-solid fa-plus"></i>
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

let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
  columnDefs: [{ orderable: false, targets: [4] }],
  searching: false,
  info: false,
  paging: false,
  pageLenght: 10,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
};

function initializeDataTable(applicationContext) {
  if (dataTableInitialized) {
    dataTable.destroy();
  }
  listCars(applicationContext);
  dataTable = $("#carManagement_dataTable").DataTable(dataTableOptions);
  dataTableInitialized = true;
}

function listCars(applicationContext) {
  //For debugging

  console.log("BORRAR DATOS DUMMY DE AUTOS!");
  let car = new Car("Honda", "Civic Si", 2009, 1000);
  applicationContext.carManagementSystem().addCar(car);
  car = new Car("Ferrari", "Modena 360", 2005, 500);
  applicationContext.carManagementSystem().addCar(car);
  car = new Car("Volkswagen", "GTI", 2015, 100000);
  applicationContext.carManagementSystem().addCar(car);
  car = new Car("Toyota", "Corolla", 2008, 500000);
  applicationContext.carManagementSystem().addCar(car);

  const cars = applicationContext.carManagementSystem().cars();
  let content = ``;
  cars.forEach((car) => {
    content += `
  <tr>
    <td>${car.manufacturer}</td>
    <td>${car.model}</td>
    <td>${car.year}</td>
    <td>${car.mileage}</td>
    <td>
      <button class="btn btn-sm btn-primary"><i class="fa-regular fa-pen-to-square"></i></button> 
      <button class="btn btn-sm btn-danger"><i class="fa-solid fa-xmark"></i></button>
    </td>
  </tr>
  `;
  });
  // Its not necessary using document because its an ID and JS knows how to solve it (?)
  carManagement_tbody.innerHTML = content;
}

function initializeDataTableEventLister(applicationContext) {
  window.addEventListener("load", () => {
    initializeDataTable(applicationContext);
  });
}
