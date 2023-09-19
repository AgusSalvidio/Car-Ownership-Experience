import { rootDiv } from "../Utils/utils.js";
import {
  initializeCharts,
  loadDepositsAndWithdrawalsChart,
  loadProfitAndLossesChart,
  loadCarsForSaleAndSoldAmountsChart,
} from "./chartView.js";
export { initializeHomeView, initializeHomeNavButtonEventListener };

function initializeEmptyStorageAlert() {
  Swal.fire({
    title: "Inicio por primera vez",
    text: "Al no disponer de operaciones con autos y/o ingresos o egresos, en el home no se mostrarán gráficos para analizar.",
    icon: "info",
    confirmButtonColor: "#007ee5",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  });
}

function initializeEmptyStorageView(applicationContext) {
  let homeView = document.querySelector("#charts");
  let content = `<p class="title px-4">Para visualizar gráficos, agregar operaciones con autos y/o ingresos o egresos.</p>`;
  homeView.innerHTML = content;
}

function initializeHomeView(applicationContext) {
  let div = rootDiv();
  div.append(homeView);
  if (localStorage.length == 0) {
    initializeEmptyStorageAlert();
    initializeEmptyStorageView(applicationContext);
  } else {
    initializeCharts(applicationContext);
    loadCharts(applicationContext);
  }
}

function loadCharts(applicationContext) {
  loadDepositsAndWithdrawalsChart(applicationContext);
  loadProfitAndLossesChart(applicationContext);
  loadCarsForSaleAndSoldAmountsChart(applicationContext);
}

let homeView = document.createElement("div");
homeView.setAttribute("id", "home-view");
homeView.innerHTML = `
  <div class="titles">
    <h2 class="title">¡Bienvenido!</h2>
  </div>
  <div id="charts"></div>
     
`;

function initializeHomeNavButtonEventListener(applicationContext) {
  initializeHomeView(applicationContext);
}
