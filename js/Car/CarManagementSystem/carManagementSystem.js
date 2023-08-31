export { CarManagementSystem };

class CarManagementSystem {
  constructor() {
    this.sequentialNumberProvider = 0;
    this.carCollection = [];
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

  addCar(aCar) {
    this.addSequentialNumber(aCar);
    this.carCollection.push(aCar);
  }
  removeCar(aCar) {
    this.carCollection.pop(aCar);
  }
  updateCar(originalCar, updatedCar) {
    updatedCar.sequentialNumber = originalCar.sequentialNumber;
    const index = this.carCollection.indexOf(originalCar);
    if (~index) {
      this.carCollection[index] = updatedCar;
    }
  }
  cars() {
    return this.carCollection;
  }
}
