export { CarTransaction };

class CarTransaction {
  constructor(car, purchasePrice, salePrice, state) {
    this.sequentialNumber;
    this.car = car;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
    this.state = state;
  }
  printOn() {
    return `Operación con estado ${state} de ${this.car}`;
  }
}
