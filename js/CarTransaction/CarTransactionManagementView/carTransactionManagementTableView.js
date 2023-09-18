export {
  carTransactionManagementTableView,
  initializeDataTableEventLister,
  listCarTransactions,
  option,
  selectedObjectID,
  initializeDataTable,
  updateOptionModalWith,
};

let dataTable;
let dataTableInitialized = false;
let selectedObjectID;
let option;

function updateOptionModalWith(anUpdatedOption) {
  option = anUpdatedOption;
}

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
    zeroRecords: "Ninguna operación de auto encontrada",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ninguna operación de auto encontrada",
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

let carTransactionManagementTableView = document.createElement("div");
carTransactionManagementTableView.classList.add("px-1");
carTransactionManagementTableView.innerHTML = `
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<table
id="carTransactionManagement_dataTable"
class=" table table-striped"
>
<thead>
  <tr>
    <th>ID</th>
    <th>Marca</th>
    <th>Modelo</th>
    <th>Año</th>
    <th>Kilometraje</th>
    <th>Estado</th>
    <th>Precio compra</th>
    <th>Precio venta</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody id="carTransactionManagement_tbody">
</tbody>
</table>
</div>
</div>`;

function initializeDataTable(applicationContext) {
  if (dataTableInitialized) {
    dataTable.destroy();
  }
  listCarTransactions(applicationContext);
  dataTable = $("#carTransactionManagement_dataTable").DataTable(
    dataTableOptions
  );
  dataTableInitialized = true;
  updateOptionModalWith("");
}

function listCarTransactions(applicationContext) {
  const carTransactions = applicationContext
    .carTransactionManagementSystem()
    .carTransactions();
  let content = ``;
  carTransactions.forEach((carTransaction) => {
    content += `
  <tr>
    <td>${carTransaction.sequentialNumber}</td>
    <td>${carTransaction.car.manufacturer}</td>
    <td>${carTransaction.car.model}</td>
    <td>${carTransaction.car.year}</td>
    <td>${carTransaction.car.mileage}</td>
    <td>${carTransaction.state}</td>
    <td>${carTransaction.purchasePrice}</td>
    <td>${carTransaction.salePrice}</td>
    <td>
      <a id="editCarTransactionButton" class="btn-sm "><i class="fa-regular fa-pen-to-square" ></i></a> 
      <a id="removeCarTransactionButton" class="btn-sm "><i class="fa-solid fa-xmark" style="color:red"></i></a>
    </td>
  </tr>
  `;
  });
  // Its not necessary using document because its an ID and JS knows how to solve it (?)
  carTransactionManagement_tbody.innerHTML = content;
}

function onTrigger(element, event, selector, handler) {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
}

function initializeDataTableEventLister(applicationContext) {
  initializeDataTable(applicationContext);

  onTrigger(document, "click", "#editCarTransactionButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const idTable = row.parentNode.children[0].innerHTML;
    const manufacturerTable = row.parentNode.children[1].innerHTML;
    const modelTable = row.parentNode.children[2].innerHTML;
    const yearTable = row.parentNode.children[3].innerHTML;
    const mileageTable = row.parentNode.children[4].innerHTML;
    const stateTable = row.parentNode.children[5].innerHTML;
    const purchasePriceTable = row.parentNode.children[6].innerHTML;
    const salePriceTable = row.parentNode.children[7].innerHTML;

    document.querySelector("#carTransactionRegistrationForm").reset();

    const manufacturer = document.querySelector("#manufacturer");
    const model = document.querySelector("#model");
    const year = document.querySelector("#year");
    const mileage = document.querySelector("#mileage");
    const purchasePrice = document.querySelector("#purchasePrice");
    const salePrice = document.querySelector("#salePrice");

    manufacturer.value = manufacturerTable;
    model.value = modelTable;
    year.value = yearTable;
    mileage.value = mileageTable;
    $(`input[name=radioCarTransaction][value=${stateTable}]`).prop(
      "checked",
      true
    );
    purchasePrice.value = purchasePriceTable;
    salePrice.value = salePriceTable;

    updateOptionModalWith("Edit");
    selectedObjectID = idTable;
    let modalLabel = document.querySelector(
      "#carTransactionRegistrationModalLabel"
    );
    modalLabel.innerHTML = "Editar operación de auto";
    $("#carTransactionRegistrationModal").modal("show");
  });
  onTrigger(document, "click", "#removeCarTransactionButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const id = row.parentNode.firstElementChild.innerHTML;
    const carTransactionToRemove = applicationContext
      .carTransactionManagementSystem()
      .carTransactionIdentifiedBy(id);
    Swal.fire({
      title: `¿Seguro que desea eliminar ${carTransactionToRemove.printOn()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007ee5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        applicationContext
          .carTransactionManagementSystem()
          .removeCarTransaction(carTransactionToRemove);
        /*Render again only the table, because if i reload all the page, when i have more than one, then
        i will start all again, returning to the first loaded page. -asalvidio
        */
        //location.reload();
        initializeDataTable(applicationContext);
      }
    });
  });
}
