import { Car } from "../../Car/car.js";
import { CarTransaction } from "../carTransaction.js";
export { CarTransactionManagementSystem };

class CarTransactionManagementSystem {
  storageCarTransactionCollection() {
    let storage = localStorage.getItem("CarTransactionManagementSystem");
    if (storage) {
      let untypedCarTransactionCollection = JSON.parse(storage);
      let typedCarTransactionCollection = [];
      untypedCarTransactionCollection.forEach((untypedCarTransaction) => {
        let car = untypedCarTransaction.car;
        let parsedCar = new Car(
          car.manufacturer,
          car.model,
          parseInt(car.year),
          parseInt(car.mileage)
        );

        let carTransaction = new CarTransaction(
          parsedCar,
          parseInt(untypedCarTransaction.purchasePrice),
          parseInt(untypedCarTransaction.salePrice),
          untypedCarTransaction.state
        );

        carTransaction.sequentialNumber = parseInt(
          untypedCarTransaction.sequentialNumber
        );
        typedCarTransactionCollection.push(carTransaction);
      });
      return typedCarTransactionCollection;
    } else {
      return [];
    }
  }

  sequentialNumberProvider() {
    if (!this.carTransactionCollection.length) {
      return 1;
    } else {
      let lastSequentialNumber =
        this.carTransactionCollection.slice(-1)[0].sequentialNumber;
      return lastSequentialNumber + 1;
    }
  }

  constructor() {
    this.carTransactionCollection = this.storageCarTransactionCollection();
    this.sequentialNumberProvider = this.sequentialNumberProvider();
    this.typeDescription = "Sistema de Administración de Operaciones de Autos";
  }

  addSequentialNumber(aCarTransaction) {
    aCarTransaction.sequentialNumber = this.sequentialNumberProvider;
    this.sequentialNumberProvider++;
  }

  carTransactionIdentifiedBy(aSequentialNumber) {
    return this.carTransactionCollection.find(
      (carTransaction) => carTransaction.sequentialNumber == aSequentialNumber
    );
  }

  refreshDatabaseStorage() {
    localStorage.setItem(
      "CarTransactionManagementSystem",
      JSON.stringify(this.carTransactionCollection)
    );
  }

  addTransactionCar(aCarTransaction) {
    this.addSequentialNumber(aCarTransaction);
    this.carTransactionCollection.push(aCarTransaction);
    this.refreshDatabaseStorage();
  }
  removeCarTransaction(aCarTransaction) {
    this.carTransactionCollection.pop(aCarTransaction);
    this.refreshDatabaseStorage();
  }
  updateCarTransaction(originalCarTransaction, updatedCarTransaction) {
    updatedCarTransaction.sequentialNumber =
      originalCarTransaction.sequentialNumber;
    const index = this.carTransactionCollection.indexOf(originalCarTransaction);
    if (~index) {
      this.carTransactionCollection[index] = updatedCarTransaction;
    }
    this.refreshDatabaseStorage();
  }
  carTransactions() {
    return this.carTransactionCollection;
  }
}
