export { ApplicationContext };

class ApplicationContext {
  constructor() {
    this.systems = [];
  }
  addSystem(aSystem) {
    this.systems.push(aSystem);
  }
  carManagementSystem() {
    return this.systems.find(
      (system) =>
        system.typeDescription === "Sistema de Administración de Autos"
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
