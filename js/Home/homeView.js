import { rootDiv } from "../Utils/utils.js";
export { initializeHomeView, initializeHomeNavButtonEventListener };

function initializeHomeView(applicationContext) {
  let div = rootDiv();
  div.append(homeView);
}

let homeView = document.createElement("div");
homeView.classList.add("p-2");
homeView.setAttribute("id", "home-view");
homeView.innerHTML = `<p class="">Bienvenido! Todavia no hay widgets disponibles, están en proceso. Pero se pueden cargar autos y gastos.</p>
`;

function initializeHomeNavButtonEventListener(applicationContext) {
  initializeHomeView(applicationContext);
}
