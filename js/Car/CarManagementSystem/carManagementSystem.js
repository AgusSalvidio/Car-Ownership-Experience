export { CarManagementSystem };

class CarManagementSystem {
  constructor() {
    this.carCollection = [];
    this.typeDescription = "Sistema de Administración de Autos";
  }
  addCar(aCar) {
    this.carCollection.push(aCar);
  }
  cars() {
    return this.carCollection;
  }
}
