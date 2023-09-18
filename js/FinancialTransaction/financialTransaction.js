export { FinancialTransaction };

class FinancialTransaction {
  constructor(type, price, notes) {
    this.sequentialNumber;
    this.type = type;
    this.price = price;
    this.notes = notes;
  }
  printOn() {
    return `${this.type} de $ ${this.price}`;
  }
}
