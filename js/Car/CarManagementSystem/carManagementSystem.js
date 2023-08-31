export { CarManagementSystem };

class CarManagementSystem {
  storageCarCollection() {
    let storage = localStorage.getItem("CarManagementSystem");
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  }

  constructor() {
    this.sequentialNumberProvider = 0;
    this.carCollection = this.storageCarCollection();
    this.typeDescription = "Sistema de Administración de Autos";
  }

  addSequentialNumber(aCar) {
    aCar.sequentialNumber = this.sequentialNumberProvider;
    this.sequentialNumberProvider++;
  }

  carIdentifiedBy(aSequentialNumber) {
    return this.carCollection.find(
      (car) => car.sequentialNumber == aSequentialNumber
    );
  }

  refreshDatabaseStorage() {
    localStorage.setItem(
      "CarManagementSystem",
      JSON.stringify(this.carCollection)
    );
  }

  addCar(aCar) {
    this.addSequentialNumber(aCar);
    this.carCollection.push(aCar);
    this.refreshDatabaseStorage();
  }
  removeCar(aCar) {
    this.carCollection.pop(aCar);
    this.refreshDatabaseStorage();
  }
  updateCar(originalCar, updatedCar) {
    updatedCar.sequentialNumber = originalCar.sequentialNumber;
    const index = this.carCollection.indexOf(originalCar);
    if (~index) {
      this.carCollection[index] = updatedCar;
    }
    this.refreshDatabaseStorage();
  }
  cars() {
    return this.carCollection;
  }
}
