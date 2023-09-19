import { FinancialTransaction } from "../financialTransaction.js";
export {
  financialTransactionManagementTableView,
  initializeDataTableEventLister,
  listFinancialTransactions,
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
  ordering: false,
  searching: false,
  info: false,
  paging: false,
  pageLenght: 10,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún ingreso/egreso encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún ingreso/egreso encontrado",
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

let financialTransactionManagementTableView = document.createElement("div");
financialTransactionManagementTableView.classList.add("px-1");
financialTransactionManagementTableView.innerHTML = `
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<table
id="financialTransactionManagement_dataTable"
class=" table table-striped"
>
<thead>
  <tr>
    <th>ID</th>
    <th>Tipo</th>
    <th>Precio (ARS)</th>
    <th>Notas</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody id="financialTransactionManagement_tbody">
</tbody>
</table>
</div>
</div>`;

function initializeDataTable(applicationContext) {
  if (dataTableInitialized) {
    dataTable.destroy();
  }
  listFinancialTransactions(applicationContext);
  dataTable = $("#financialTransactionManagement_dataTable").DataTable(
    dataTableOptions
  );
  dataTableInitialized = true;
  updateOptionModalWith("");
}

function listFinancialTransactions(applicationContext) {
  const financialTransactions = applicationContext
    .financialTransactionManagementSystem()
    .financialTransactions();
  let content = ``;
  financialTransactions.forEach((financialTransaction) => {
    content += `
  <tr>
    <td>${financialTransaction.sequentialNumber}</td>
    <td>${financialTransaction.type}</td>
    <td>${financialTransaction.price}</td>
    <td><a id="infoFinancialTransactionButton" class="btn-sm "><i class="fa-solid fa-magnifying-glass"></i></a></td>
    <td>
      <a id="editFinancialTransactionButton" class="btn-sm "><i class="fa-regular fa-pen-to-square" ></i></a> 
      <a id="removeFinancialTransactionButton" class="btn-sm "><i class="fa-solid fa-xmark" style="color:red"></i></a>
    </td>
  </tr>
  `;
  });
  financialTransactionManagement_tbody.innerHTML = content;
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
  onTrigger(document, "click", "#infoFinancialTransactionButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const idTable = row.parentNode.children[0].innerHTML;

    document.querySelector("#financialTransactionRegistrationForm").reset();

    const identifiedFinancialTransaction = applicationContext
      .financialTransactionManagementSystem()
      .financialTransactionIdentifiedBy(idTable);
    const notes = identifiedFinancialTransaction.notes;

    const notesModal = document.querySelector("#notesModal");

    notesModal.value = notes;

    selectedObjectID = idTable;
    let modalLabel = document.querySelector(
      "#financialTransactionInfoModalLabel"
    );
    modalLabel.innerHTML = "Notas";
    $("#financialTransactionInfoModal").modal("show");
  });

  onTrigger(document, "click", "#editFinancialTransactionButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const idTable = row.parentNode.children[0].innerHTML;
    const typeTable = row.parentNode.children[1].innerHTML;
    const priceTable = row.parentNode.children[2].innerHTML;

    document.querySelector("#financialTransactionRegistrationForm").reset();

    const price = document.querySelector("#price");
    const notes = document.querySelector("#notes");

    const identifiedFinancialTransaction = applicationContext
      .financialTransactionManagementSystem()
      .financialTransactionIdentifiedBy(idTable);

    $(`input[name=radioFinancialTransaction][value=${typeTable}]`).prop(
      "checked",
      true
    );
    price.value = priceTable;
    notes.value = identifiedFinancialTransaction.notes;

    updateOptionModalWith("Edit");
    selectedObjectID = idTable;
    let modalLabel = document.querySelector(
      "#financialTransactionRegistrationModalLabel"
    );
    modalLabel.innerHTML = "Editar ingreso/egreso";
    $("#financialTransactionRegistrationModal").modal("show");
  });
  onTrigger(document, "click", "#removeFinancialTransactionButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const id = row.parentNode.firstElementChild.innerHTML;
    const financialTransactionToRemove = applicationContext
      .financialTransactionManagementSystem()
      .financialTransactionIdentifiedBy(id);
    Swal.fire({
      title: `¿Seguro que desea eliminar ${financialTransactionToRemove.printOn()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007ee5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        applicationContext
          .financialTransactionManagementSystem()
          .removeFinancialTransaction(financialTransactionToRemove);
        initializeDataTable(applicationContext);
      }
    });
  });
}
