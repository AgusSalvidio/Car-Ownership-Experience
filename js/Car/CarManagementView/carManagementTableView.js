export { carManagementTableView };

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
