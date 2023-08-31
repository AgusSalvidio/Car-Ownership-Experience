import { Car } from "../car.js";
export { CarManagementSystem };

class CarManagementSystem {
  storageCarCollection() {
    let storage = localStorage.getItem("CarManagementSystem");
    if (storage) {
      let untypedCarCollection = JSON.parse(storage);
      let typedCarCollection = [];
      untypedCarCollection.forEach((untypedCar) => {
        let car = new Car(
          untypedCar.manufacturer,
          untypedCar.model,
          parseInt(untypedCar.year),
          parseInt(untypedCar.mileage)
        );
        car.sequentialNumber = parseInt(untypedCar.sequentialNumber);
        typedCarCollection.push(car);
      });
      return typedCarCollection;
    } else {
      return [];
    }
  }

  sequentialNumberProvider() {
    if (!this.carCollection.length) {
      return 1;
    } else {
      let lastSequentialNumber =
        this.carCollection.slice(-1)[0].sequentialNumber;
      return lastSequentialNumber++;
    }
  }

  constructor() {
    this.carCollection = this.storageCarCollection();
    this.sequentialNumberProvider = this.sequentialNumberProvider();
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
