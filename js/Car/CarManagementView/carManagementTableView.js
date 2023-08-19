export { carManagementTableView };

let carManagementTableView = document.createElement("div");
carManagementTableView.classList.add(
  "d-flex",
  "justify-content-center",
  "mx-2"
);
carManagementTableView.innerHTML = `
<table
id="car-management-table"
class=" table table-striped"
>
<thead>
  <tr>
    <th>Marca</th>
    <th>Modelo</th>
    <th>Año</th>
    <th>Kilometraje</th>
  </tr>
</thead>
<tbody id="car-management-tbody">
</tbody>
</table>`;
