export {
  initializeCharts,
  loadDepositsAndWithdrawalsChart,
  loadCarsForSaleAndSoldAmountsChart,
  loadProfitAndLossesChart,
};

let depositAndWithdrawalsChart;
let carsForSaleAndSoldAmountsChart;
let profitAndLossesChart;

function initializeCharts(applicationContext) {
  let homeView = document.querySelector("#charts");
  let content = `<div class="d-flex justify-content-center animate-fadeInRight">
      <div class="grid-item chart">
        <canvas id="depositAndWithdrawalsChart" name="depositAndWithdrawalsChart"></canvas>
        <label for="depositAndWithdrawalsChart" class="px-4">Ingresos/Egresos</label>
      </div>
      <div class="grid-item chart">
        <canvas id="profitAndLossesChart" name="profitAndLossesChart"></canvas>
        <label for="profitAndLossesChart" class="px-4">Ganancias/Pérdidas</label>
      </div>
      <div class="grid-item chart">
        <canvas id="carsForSaleAndSoldAmountsChart" name="carsForSaleAndSoldAmountsChart"></canvas>
        <label for="carsForSaleAndSoldAmountsChart" class="px-4">Vendidos/Pendientes</label>
      </div>
  </div>`;
  homeView.innerHTML = content;
}

function chartComposedOf(type, dataLabels, dataSetLabel, data, context) {
  return new Chart(context, {
    type: type,
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: dataSetLabel,
          data: data,
          backgroundColor: ["rgb(76,164,236)", "rgb(0,88,160)"],
        },
      ],
    },
  });
}

function loadDepositsAndWithdrawalsChart(applicationContext) {
  let context = document
    .querySelector("#depositAndWithdrawalsChart")
    .getContext("2d");

  if (depositAndWithdrawalsChart) {
    depositAndWithdrawalsChart.destroy();
  }

  let depositsValue = applicationContext
    .financialTransactionManagementSystem()
    .allDepositsValue();

  let withdrawalsValue = applicationContext
    .financialTransactionManagementSystem()
    .allWithdrawalsValue();

  depositAndWithdrawalsChart = chartComposedOf(
    "doughnut",
    ["Ingresos", "Egresos"],
    "ARS",
    [depositsValue, withdrawalsValue],
    context
  );
}

function loadCarsForSaleAndSoldAmountsChart(applicationContext) {
  let context = document
    .querySelector("#carsForSaleAndSoldAmountsChart")
    .getContext("2d");

  if (carsForSaleAndSoldAmountsChart) {
    carsForSaleAndSoldAmountsChart.destroy();
  }

  let forSaleAmount = applicationContext
    .carTransactionManagementSystem()
    .forSaleCarAmount();

  let soldAmount = applicationContext
    .carTransactionManagementSystem()
    .soldCarAmount();

  carsForSaleAndSoldAmountsChart = chartComposedOf(
    "pie",
    ["Vendidos", "Pendientes"],
    "Cantidad",
    [soldAmount, forSaleAmount],
    context
  );
}

function profitAndLosses(applicationContext) {
  let depositsValue = applicationContext
    .financialTransactionManagementSystem()
    .allDepositsValue();

  let withdrawalsValue = applicationContext
    .financialTransactionManagementSystem()
    .allWithdrawalsValue();

  let allForSaleCarValue = applicationContext
    .carTransactionManagementSystem()
    .allForSaleCarValue();

  let allSoldCarValue = applicationContext
    .carTransactionManagementSystem()
    .allSoldCarValue();

  return [
    depositsValue + allSoldCarValue,
    withdrawalsValue + allForSaleCarValue,
  ];
}

function loadProfitAndLossesChart(applicationContext) {
  let context = document
    .querySelector("#profitAndLossesChart")
    .getContext("2d");

  if (profitAndLossesChart) {
    profitAndLossesChart.destroy();
  }

  profitAndLossesChart = chartComposedOf(
    "doughnut",
    ["Ganancias", "Pérdidas"],
    "ARS",
    profitAndLosses(applicationContext),
    context
  );
}
