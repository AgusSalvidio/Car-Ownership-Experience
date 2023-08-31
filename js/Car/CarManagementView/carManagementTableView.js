import { Car } from "../car.js";
export {
  carManagementTableView,
  initializeDataTableEventLister,
  listCars,
  option,
  selectedObjectID,
};

let dataTable;
let dataTableInitialized = false;
let option = "";
let selectedObjectID;

const dataTableOptions = {
  /*Need to research more to understand why the page refresh with only a few objects - asalvidio
  columnDefs: [{ orderable: false, targets: [5] }],*/
  ordering: false,
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

let carManagementTableView = document.createElement("div");
carManagementTableView.classList.add("px-1");
carManagementTableView.innerHTML = `
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<table
id="carManagement_dataTable"
class=" table table-striped"
>
<thead>
  <tr>
    <th>ID</th>
    <th>Marca</th>
    <th>Modelo</th>
    <th>Año</th>
    <th>Kilometraje</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody id="carManagement_tbody">
</tbody>
</table>
</div>
</div>`;

function initializeDataTable(applicationContext) {
  if (dataTableInitialized) {
    dataTable.destroy();
  }
  console.log("Se inicializa la tabla");
  listCars(applicationContext);
  dataTable = $("#carManagement_dataTable").DataTable(dataTableOptions);
  dataTableInitialized = true;
}

function listCars(applicationContext) {
  //For debugging
  console.log("Listo los vehiculos");
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
    <td>${car.sequentialNumber}</td>
    <td>${car.manufacturer}</td>
    <td>${car.model}</td>
    <td>${car.year}</td>
    <td>${car.mileage}</td>
    <td>
      <a id="editButton" class="btn-sm "><i class="fa-regular fa-pen-to-square" ></i></a> 
      <a id="removeButton" class="btn-sm "><i class="fa-solid fa-xmark" style="color:red"></i></a>
    </td>
  </tr>
  `;
  });
  // Its not necessary using document because its an ID and JS knows how to solve it (?)
  carManagement_tbody.innerHTML = content;
}

function onTrigger(element, event, selector, handler) {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
}

function initializeDataTableEventLister(applicationContext) {
  window.addEventListener("load", () => {
    initializeDataTable(applicationContext);
  });
  onTrigger(document, "click", "#editButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const idTable = row.parentNode.children[0].innerHTML;
    const manufacturerTable = row.parentNode.children[1].innerHTML;
    const modelTable = row.parentNode.children[2].innerHTML;
    const yearTable = row.parentNode.children[3].innerHTML;
    const mileageTable = row.parentNode.children[4].innerHTML;

    const manufacturer = document.querySelector("#manufacturer");
    const model = document.querySelector("#model");
    const year = document.querySelector("#year");
    const mileage = document.querySelector("#mileage");

    manufacturer.value = manufacturerTable;
    model.value = modelTable;
    year.value = yearTable;
    mileage.value = mileageTable;
    option = "Edit";
    selectedObjectID = idTable;
    let modalLabel = document.querySelector("#carRegistrationModalLabel");
    modalLabel.innerHTML = "Editar auto";
    $("#carRegistrationModal").modal("show");
  });
  onTrigger(document, "click", "#removeButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const id = row.parentNode.firstElementChild.innerHTML;
    const carToRemove = applicationContext
      .carManagementSystem()
      .carIdentifiedBy(id);
    applicationContext.carManagementSystem().removeCar(carToRemove);
    console.log("Lo borre");
    //location.reload();
  });
}
