import { Expense } from "../expense.js";
export {
  expenseManagementTableView,
  initializeDataTableEventLister,
  listExpenses,
  option,
  selectedObjectID,
  initializeDataTable,
};

let dataTable;
let dataTableInitialized = false;
let selectedObjectID;
let option;
const dataTableOptions = {
  ordering: false,
  searching: false,
  info: false,
  paging: false,
  pageLenght: 10,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún gasto encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún gasto encontrado",
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

let expenseManagementTableView = document.createElement("div");
expenseManagementTableView.classList.add("px-1");
expenseManagementTableView.innerHTML = `
<div class="row">
<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
<table
id="expenseManagement_dataTable"
class=" table table-striped"
>
<thead>
  <tr>
    <th>ID</th>
    <th>Tipo</th>
    <th>Precio</th>
    <th>Notas</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody id="expenseManagement_tbody">
</tbody>
</table>
</div>
</div>`;

function initializeDataTable(applicationContext) {
  if (dataTableInitialized) {
    dataTable.destroy();
  }
  listExpenses(applicationContext);
  dataTable = $("#expenseManagement_dataTable").DataTable(dataTableOptions);
  dataTableInitialized = true;
  option = "";
}

function listExpenses(applicationContext) {
  const expenses = applicationContext.expenseManagementSystem().expenses();
  let content = ``;
  expenses.forEach((expense) => {
    content += `
  <tr>
    <td>${expense.sequentialNumber}</td>
    <td>${expense.name}</td>
    <td>${expense.price}</td>
    <td><a id="infoExpenseButton" class="btn-sm "><i class="fa-solid fa-magnifying-glass"></i></a></td>
    <td>
      <a id="editExpenseButton" class="btn-sm "><i class="fa-regular fa-pen-to-square" ></i></a> 
      <a id="removeExpenseButton" class="btn-sm "><i class="fa-solid fa-xmark" style="color:red"></i></a>
    </td>
  </tr>
  `;
  });
  expenseManagement_tbody.innerHTML = content;
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
  onTrigger(document, "click", "#infoExpenseButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const idTable = row.parentNode.children[0].innerHTML;

    document.querySelector("#expenseRegistrationForm").reset();

    const identifiedExpense = applicationContext
      .expenseManagementSystem()
      .expenseIdentifiedBy(idTable);
    const notes = identifiedExpense.notes;

    const notesModal = document.querySelector("#notesModal");

    notesModal.value = notes;

    selectedObjectID = idTable;
    let modalLabel = document.querySelector("#expenseInfoModalLabel");
    modalLabel.innerHTML = "Notas";
    $("#expenseInfoModal").modal("show");
  });

  onTrigger(document, "click", "#editExpenseButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const idTable = row.parentNode.children[0].innerHTML;
    const nameTable = row.parentNode.children[1].innerHTML;
    const priceTable = row.parentNode.children[2].innerHTML;

    document.querySelector("#expenseRegistrationForm").reset();

    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const notes = document.querySelector("#notes");

    const identifiedExpense = applicationContext
      .expenseManagementSystem()
      .expenseIdentifiedBy(idTable);

    name.value = nameTable;
    price.value = priceTable;
    notes.value = identifiedExpense.notes;

    option = "Edit";
    selectedObjectID = idTable;
    let modalLabel = document.querySelector("#expenseRegistrationModalLabel");
    modalLabel.innerHTML = "Editar gasto";
    $("#expenseRegistrationModal").modal("show");
  });
  onTrigger(document, "click", "#removeExpenseButton", (e) => {
    const row = e.target.parentNode.parentNode;
    const id = row.parentNode.firstElementChild.innerHTML;
    const expenseToRemove = applicationContext
      .expenseManagementSystem()
      .expenseIdentifiedBy(id);
    Swal.fire({
      title: `¿Seguro que desea eliminar ${expenseToRemove.printOn()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007ee5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        applicationContext
          .expenseManagementSystem()
          .removeExpense(expenseToRemove);
        initializeDataTable(applicationContext);
      }
    });
  });
}
