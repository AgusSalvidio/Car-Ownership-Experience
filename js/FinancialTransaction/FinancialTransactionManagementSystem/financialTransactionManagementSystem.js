import { FinancialTransaction } from "../financialTransaction.js";
export { FinancialTransactionManagementSystem };

class FinancialTransactionManagementSystem {
  storageFinancialTransactionCollection() {
    let storage = localStorage.getItem("FinancialTransactionManagementSystem");
    if (storage) {
      let untypedFinancialTransactionCollection = JSON.parse(storage);
      let typedFinancialTransactionCollection = [];
      untypedFinancialTransactionCollection.forEach(
        (untypedFinancialTransaction) => {
          let financialTransaction = new FinancialTransaction(
            untypedFinancialTransaction.type,
            parseInt(untypedFinancialTransaction.price),
            untypedFinancialTransaction.notes
          );
          financialTransaction.sequentialNumber = parseInt(
            untypedFinancialTransaction.sequentialNumber
          );
          typedFinancialTransactionCollection.push(financialTransaction);
        }
      );
      return typedFinancialTransactionCollection;
    } else {
      return [];
    }
  }

  sequentialNumberProvider() {
    if (!this.financialTransactionCollection.length) {
      return 1;
    } else {
      let lastSequentialNumber =
        this.financialTransactionCollection.slice(-1)[0].sequentialNumber;
      return lastSequentialNumber + 1;
    }
  }

  constructor() {
    this.financialTransactionCollection =
      this.storageFinancialTransactionCollection();
    this.sequentialNumberProvider = this.sequentialNumberProvider();
    this.typeDescription = "Sistema de Administración de Ingresos/Egresos";
  }

  addSequentialNumber(aFinancialTransaction) {
    aFinancialTransaction.sequentialNumber = this.sequentialNumberProvider;
    this.sequentialNumberProvider++;
  }

  financialTransactionIdentifiedBy(aSequentialNumber) {
    return this.financialTransactionCollection.find(
      (financialTransaction) =>
        financialTransaction.sequentialNumber == aSequentialNumber
    );
  }

  refreshDatabaseStorage() {
    localStorage.setItem(
      "FinancialTransactionManagementSystem",
      JSON.stringify(this.financialTransactionCollection)
    );
  }

  addFinancialTransaction(aFinancialTransaction) {
    this.addSequentialNumber(aFinancialTransaction);
    this.financialTransactionCollection.push(aFinancialTransaction);
    this.refreshDatabaseStorage();
  }
  removeFinancialTransaction(aFinancialTransaction) {
    this.financialTransactionCollection.pop(aFinancialTransaction);
    this.refreshDatabaseStorage();
  }
  updateFinancialTransaction(
    originalFinancialTransaction,
    updatedFinancialTransaction
  ) {
    updatedFinancialTransaction.sequentialNumber =
      originalFinancialTransaction.sequentialNumber;
    const index = this.financialTransactionCollection.indexOf(
      originalFinancialTransaction
    );
    if (~index) {
      this.financialTransactionCollection[index] = updatedFinancialTransaction;
    }
    this.refreshDatabaseStorage();
  }
  financialTransactions() {
    return this.financialTransactionCollection;
  }
}
