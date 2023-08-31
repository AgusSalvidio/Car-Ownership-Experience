import { Expense } from "../expense.js";
export { ExpenseManagementSystem };

class ExpenseManagementSystem {
  storageExpenseCollection() {
    let storage = localStorage.getItem("ExpenseManagementSystem");
    if (storage) {
      let untypedExpenseCollection = JSON.parse(storage);
      let typedExpenseCollection = [];
      untypedExpenseCollection.forEach((untypedExpense) => {
        let expense = new Expense(
          untypedExpense.name,
          parseInt(untypedExpense.price),
          untypedExpense.model
        );
        expense.sequentialNumber = parseInt(untypedExpense.sequentialNumber);
        typedExpenseCollection.push(expense);
      });
      return typedExpenseCollection;
    } else {
      return [];
    }
  }

  sequentialNumberProvider() {
    if (!this.expenseCollection.length) {
      return 1;
    } else {
      let lastSequentialNumber =
        this.expenseCollection.slice(-1)[0].sequentialNumber;
      return lastSequentialNumber + 1;
    }
  }

  constructor() {
    this.expenseCollection = this.storageExpenseCollection();
    this.sequentialNumberProvider = this.sequentialNumberProvider();
    this.typeDescription = "Sistema de Administración de Gastos";
  }

  addSequentialNumber(anExpense) {
    anExpense.sequentialNumber = this.sequentialNumberProvider;
    this.sequentialNumberProvider++;
  }

  expenseIdentifiedBy(aSequentialNumber) {
    return this.expenseCollection.find(
      (expense) => expense.sequentialNumber == aSequentialNumber
    );
  }

  refreshDatabaseStorage() {
    localStorage.setItem(
      "ExpenseManagementSystem",
      JSON.stringify(this.expenseCollection)
    );
  }

  addExpense(anExpense) {
    this.addSequentialNumber(anExpense);
    this.expenseCollection.push(anExpense);
    this.refreshDatabaseStorage();
  }
  removeExpense(anExpense) {
    this.expenseCollection.pop(anExpense);
    this.refreshDatabaseStorage();
  }
  updateExpense(originalExpense, updatedExpense) {
    updatedExpense.sequentialNumber = originalExpense.sequentialNumber;
    const index = this.expenseCollection.indexOf(originalExpense);
    if (~index) {
      this.expenseCollection[index] = updatedExpense;
    }
    this.refreshDatabaseStorage();
  }
  expenses() {
    return this.expenseCollection;
  }
}
