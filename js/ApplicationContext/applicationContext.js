export { ApplicationContext };

class ApplicationContext {
  constructor() {
    this.systems = [];
  }
  addSystem(aSystem) {
    this.systems.push(aSystem);
  }
  carTransactionManagementSystem() {
    return this.systems.find(
      (system) =>
        system.typeDescription === "Sistema de Administración de Operaciones de Autos"
    );
  }
  financialTransactionManagementSystem() {
    return this.systems.find(
      (system) =>
        system.typeDescription ===
        "Sistema de Administración de Ingresos/Egresos"
    );
  }
}
