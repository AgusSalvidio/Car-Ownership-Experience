class Car {
  constructor(manufacturer, model, year, mileage) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
  }
  printOn() {
    return `${this.manufacturer} ${this.model} del año ${this.year} con ${this.mileage} Kms`;
  }
}

function carInputDetails() {
  let manufacturer = prompt("Ingrese la marca de su vehículo:");
  let model = prompt("Ingrese el modelo:");
  let year = parseInt(prompt("Ingrese el año:"));
  let mileage = parseInt(prompt("Ingrese el kilometraje:"));

  return new Car(manufacturer, model, year, mileage);
}

function expensesInput() {
  let totalExpense = 0;
  let expense = parseInt(
    prompt("Ingrese gasto(al ingresar 0 se terminará la ejecución):")
  );

  while (expense != 0) {
    console.log(expense);
    totalExpense += expense;
    expense = parseInt(prompt("Ingrese gasto:"));
  }
  return totalExpense;
}

function initialize() {
  let car = carInputDetails();
  let expenses = expensesInput();

  if (expenses != 0)
    alert(`${car.printOn()} con un gasto total de $ ${expenses}`);
  else alert(`${car.printOn()} no tiene gastos!`);
}

initialize();
