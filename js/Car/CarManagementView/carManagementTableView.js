import { Car } from "../car.js";
export { carManagementTableView, initializeDataTableEventLister, listCars };

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
