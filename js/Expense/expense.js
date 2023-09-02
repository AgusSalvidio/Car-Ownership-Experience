export { Expense };

class Expense {
  constructor(name, price, notes) {
    this.sequentialNumber;
    this.name = name;
    this.price = price;
    this.notes = notes;
  }
  printOn() {
    return `${this.name} con un total de $ ${this.price}`;
  }
}
