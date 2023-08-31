export { Car };

class Car {
  constructor(manufacturer, model, year, mileage) {
    this.sequentialNumber;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
  }
  printOn() {
    return `${this.manufacturer} ${this.model} del año ${this.year} con ${this.mileage} Kms`;
  }
}
